/* ──────────────────────────────────────────────
   Shared binary QR codec for Petit Némo forms
   Used by both fiche-voeux.js and admin.html
────────────────────────────────────────────── */

const SLOT_ORDER = [];
['matin','AM'].forEach(function(p) { ['lundi','mardi','mercredi','jeudi','vendredi'].forEach(function(d) { SLOT_ORDER.push(d + '_' + p); }); });

function minsToTime(m) {
  return Math.floor(m/60) + 'h' + String(m%60).padStart(2,'0');
}

function timeToMins(s) {
  if (!s) return null;
  var m = s.match(/^(\d+)h(\d{2})$/);
  return m ? parseInt(m[1]) * 60 + parseInt(m[2]) : null;
}

/* ── Binary encode: compact array → "N1" + base64 ── */
function encodeQRBinary(compact) {
  var child = compact[1], struct = compact[2], type = compact[3];
  var days = compact[4], vac = compact[5], perm = compact[6];
  var buf = [];

  var structMap = { p:1, b:2, i:3 };
  var typeMap   = { r:1, o:2 };
  var flags = (structMap[struct] || 0);
  flags |= (typeMap[type] || 0) << 2;
  flags |= (vac ? 1 : 0) << 4;
  var permChoice = perm ? (perm[0] === 'k' ? 1 : perm[0] === 'c' ? 2 : 0) : 0;
  flags |= permChoice << 5;
  flags |= (child[3] === 'e' ? 1 : 0) << 7;
  buf.push(flags);

  var dayBits = 0;
  for (var i = 0; i < 5; i++) { if (days[i]) dayBits |= (1 << i); }
  buf.push(dayBits);

  var enc = new TextEncoder();
  [child[0] || '', child[1] || '', child[2] || ''].forEach(function(s) {
    var bytes = enc.encode(s);
    buf.push(bytes.length);
    for (var j = 0; j < bytes.length; j++) buf.push(bytes[j]);
  });

  for (var i = 0; i < 5; i++) {
    if (days[i]) {
      var s = timeToMins(days[i][0]) || 450;
      var e = timeToMins(days[i][1]) || 1080;
      buf.push(Math.round((s - 450) / 15));
      buf.push(Math.round((e - 450) / 15));
    }
  }

  if (permChoice === 1 && perm[1]) {
    buf.push(SLOT_ORDER.indexOf(perm[1]));
  } else if (permChoice === 2 && perm[1]) {
    var entries = Object.entries(perm[1]).sort(function(a,b) { return a[1] - b[1]; });
    buf.push(entries.length);
    entries.forEach(function(e) {
      buf.push(SLOT_ORDER.indexOf(e[0]));
      buf.push(e[1]);
    });
  }

  var u8 = new Uint8Array(buf);
  var b64 = '';
  for (var i = 0; i < u8.length; i++) b64 += String.fromCharCode(u8[i]);
  return 'N1' + btoa(b64);
}

/* ── Binary decode: "N1" + base64 → compact array ── */
function decodeQRBinary(str) {
  if (!str || !str.startsWith('N1')) return null;
  var raw = atob(str.slice(2));
  var buf = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) buf[i] = raw.charCodeAt(i);
  var pos = 0;

  var flags = buf[pos++];
  var structIdx = flags & 3;
  var typeIdx   = (flags >> 2) & 3;
  var vac       = (flags >> 4) & 1;
  var permChoice = (flags >> 5) & 3;
  var dateIsExpected = (flags >> 7) & 1;

  var dayBits = buf[pos++];

  var dec = new TextDecoder();
  var strings = [];
  for (var s = 0; s < 3; s++) {
    var len = buf[pos++];
    strings.push(dec.decode(buf.slice(pos, pos + len)));
    pos += len;
  }

  var structRev = [null, 'p', 'b', 'i'];
  var typeRev   = [null, 'r', 'o'];
  var days = [];
  for (var i = 0; i < 5; i++) {
    if (dayBits & (1 << i)) {
      var sv = buf[pos++] * 15 + 450;
      var ev = buf[pos++] * 15 + 450;
      days.push([minsToTime(sv), minsToTime(ev)]);
    } else {
      days.push(null);
    }
  }

  var permData = null;
  if (permChoice === 1) {
    permData = ['k', SLOT_ORDER[buf[pos++]]];
  } else if (permChoice === 2) {
    var count = buf[pos++];
    var ranks = {};
    for (var ri = 0; ri < count; ri++) {
      var slot = SLOT_ORDER[buf[pos++]];
      var rank = buf[pos++];
      ranks[slot] = rank;
    }
    permData = ['c', ranks];
  }

  return [
    1,
    [strings[0], strings[1], strings[2] || null, dateIsExpected ? 'e' : strings[2] ? 'b' : null],
    structRev[structIdx],
    typeRev[typeIdx],
    days,
    vac,
    permData,
  ];
}

/* ── Expand compact array → human-readable object ── */
function expandCompactToObj(arr) {
  if (!Array.isArray(arr) || arr[0] !== 1) return arr;
  var child = arr[1], struct = arr[2], type = arr[3];
  var days = arr[4], vac = arr[5], perm = arr[6];
  var STRUCT_R = { p:'petit_nemo', b:'baby_nemo', i:'indifferent' };
  var TYPE_R   = { r:'regulier', o:'occasionnel' };
  var DAY_K    = ['lundi','mardi','mercredi','jeudi','vendredi'];
  var out = {
    child: { lastName: child[0] || '', firstName: child[1] || '', date: child[2] || '', dateType: child[3] === 'b' ? 'birth' : child[3] === 'e' ? 'expected' : null },
    structure: STRUCT_R[struct] || null,
    typeAccueil: TYPE_R[type] || null,
    days: DAY_K.map(function(d, i) { return { day: d, selected: !!days[i], start: days[i] ? days[i][0] : null, end: days[i] ? days[i][1] : null }; }),
    vacScolaires: !!vac,
    permanence: { choice: null, keep: null, changeRanks: {} },
  };
  if (perm) {
    out.permanence.choice = perm[0] === 'k' ? 'keep' : perm[0] === 'c' ? 'change' : null;
    if (perm[0] === 'k') out.permanence.keep = perm[1];
    if (perm[0] === 'c') out.permanence.changeRanks = perm[1] || {};
  }
  return out;
}

/* ── Encode expanded object → "N1" code (convenience wrapper) ── */
function encodeFromExpanded(data) {
  var structMap = { petit_nemo:'p', baby_nemo:'b', indifferent:'i' };
  var typeMap = { regulier:'r', occasionnel:'o' };
  var DAY_K = ['lundi','mardi','mercredi','jeudi','vendredi'];

  var dateType = null;
  if (data.child && data.child.dateType) {
    dateType = data.child.dateType === 'expected' ? 'e' : 'b';
  }

  var days = DAY_K.map(function(d, i) {
    var dd = data.days && data.days[i];
    return dd && dd.selected ? [dd.start, dd.end] : null;
  });

  var perm = null;
  if (data.permanence) {
    if (data.permanence.choice === 'keep' && data.permanence.keep) {
      perm = ['k', data.permanence.keep];
    } else if (data.permanence.choice === 'change' && data.permanence.changeRanks) {
      perm = ['c', data.permanence.changeRanks];
    }
  }

  var compact = [
    1,
    [data.child && data.child.lastName || '', data.child && data.child.firstName || '', data.child && data.child.date || null, dateType],
    structMap[data.structure] || null,
    typeMap[data.typeAccueil] || null,
    days,
    data.vacScolaires ? 1 : 0,
    perm,
  ];
  return encodeQRBinary(compact);
}
