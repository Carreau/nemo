/* ──────────────────────────────────────────────
   Config — loaded from config.json
────────────────────────────────────────────── */
let CFG = {};

function fmtLong(isoDate, locale) {
  const d = new Date(isoDate + 'T00:00:00');
  return new Intl.DateTimeFormat(locale, { weekday:'long', year:'numeric', month:'long', day:'numeric' }).format(d);
}

function fmtShort(isoDate, locale) {
  const d = new Date(isoDate + 'T00:00:00');
  return new Intl.DateTimeFormat(locale, { year:'numeric', month:'long', day:'numeric' }).format(d);
}

async function loadConfig() {
  try {
    const resp = await fetch('config.json');
    CFG = await resp.json();
  } catch (e) {
    console.warn('config.json not found, using defaults');
    CFG = { year:'2026-2027', careStart:'2026-08-26', deadline:'2026-02-23', responseBy:'2026-03-30' };
  }
  // Apply config to i18n strings using Intl date formatting
  T.fr.subtitle   = `Petit N\u00e9mo \u2014 Souhaits d\u2019accueil pour l\u2019ann\u00e9e ${CFG.year}`;
  T.fr.since      = `Accueil \u00e0 partir du ${fmtLong(CFG.careStart, 'fr-FR')}`;
  T.fr.deadline   = `\u00c0 nous retourner avant le <strong>${fmtLong(CFG.deadline, 'fr-FR')}</strong>`;
  T.fr.footer2    = `Nous donnerons suite \u00e0 votre demande au plus tard le <strong>${fmtLong(CFG.responseBy, 'fr-FR')}</strong>.`;
  T.en.subtitle   = `Petit N\u00e9mo \u2014 Care preferences for ${CFG.year}`;
  T.en.since      = `Care starting ${fmtLong(CFG.careStart, 'en-US')}`;
  T.en.deadline   = `To be returned before <strong>${fmtLong(CFG.deadline, 'en-US')}</strong>`;
  T.en.footer2    = `We will respond to your request by <strong>${fmtLong(CFG.responseBy, 'en-US')}</strong> at the latest.`;
  T.es.subtitle   = `Petit N\u00e9mo \u2014 Preferencias de acogida para ${CFG.year}`;
  T.es.since      = `Acogida a partir del ${fmtLong(CFG.careStart, 'es-ES')}`;
  T.es.deadline   = `A devolver antes del <strong>${fmtLong(CFG.deadline, 'es-ES')}</strong>`;
  T.es.footer2    = `Responderemos a su solicitud a m\u00e1s tardar el <strong>${fmtLong(CFG.responseBy, 'es-ES')}</strong>.`;
  T.de.subtitle   = `Petit N\u00e9mo \u2014 Betreuungsw\u00fcnsche f\u00fcr ${CFG.year}`;
  T.de.since      = `Betreuung ab ${fmtLong(CFG.careStart, 'de-DE')}`;
  T.de.deadline   = `Zur\u00fcckzusenden vor dem <strong>${fmtLong(CFG.deadline, 'de-DE')}</strong>`;
  T.de.footer2    = `Wir beantworten Ihre Anfrage sp\u00e4testens am <strong>${fmtLong(CFG.responseBy, 'de-DE')}</strong>.`;
  T.it.subtitle   = `Petit N\u00e9mo \u2014 Desideri di accoglienza per ${CFG.year}`;
  T.it.since      = `Accoglienza a partire dal ${fmtLong(CFG.careStart, 'it-IT')}`;
  T.it.deadline   = `Da restituire entro il <strong>${fmtLong(CFG.deadline, 'it-IT')}</strong>`;
  T.it.footer2    = `Risponderemo alla sua richiesta entro il <strong>${fmtLong(CFG.responseBy, 'it-IT')}</strong>.`;
  T.pr.subtitle   = `Petit N\u00e9mo \u2014 V\u0153ux d'accueil du Cap'taine pour ${CFG.year}`;
  T.pr.since      = `Appareillage \u00e0 partir du ${fmtLong(CFG.careStart, 'fr-FR')}, tonnerre de Brest`;
  T.pr.deadline   = `\u00c0 ramener avant le <strong>${fmtLong(CFG.deadline, 'fr-FR')}</strong>, mille sabords`;
  T.pr.footer2    = `On te signalera au plus tard le <strong>${fmtLong(CFG.responseBy, 'fr-FR')}</strong>, sacrebleu.`;
  // Re-apply current language
  setLang(lang);
}

/* ──────────────────────────────────────────────
   i18n
────────────────────────────────────────────── */
const T = {
  fr: {
    title:              'Fiche de Vœux',
    subtitle:           '',
    since:              '',
    deadline:           '',
    card_child:         "Informations sur l'enfant",
    card_structure:     "Structure d'accueil souhaitée",
    card_type:          "Type d'accueil souhaité",
    card_days:          "Jours d'accueil souhaités",
    card_days_sub:      '7h30 \u2013 18h00',
    card_perm:          'Permanences souhaitées',
    card_perm_sub:      'matin 9h\u201312h30 \u00b7 après-midi 14h30\u201318h',
    label_lastname:     "Nom de l'enfant",
    label_firstname:    "Prénom de l'enfant",
    label_birthdate:    'Né(e) le',
    label_birthexpected:'Naissance prévue le',
    hint_born:          'Date passée → enfant déjà né(e)',
    hint_expected:      'Date future → naissance à venir',
    ph_lastname:        'Ex : Martin',
    ph_firstname:       'Ex : Léa',
    opt_petit_nemo:     'Petit Nemo',
    opt_baby_nemo:      'Baby Nemo',
    opt_indifferent:    'Indifférent',
    opt_regulier:       'Accueil régulier',
    opt_occasionnel:    'Accueil occasionnel',
    days:               ['Lundi','Mardi','Mercredi','Jeudi','Vendredi'],
    de: 'de', a: 'à',
    vac:                'Uniquement pendant les vacances scolaires',
    days_footnote:      'Arrivée entre 7h30 et 9h00 \u00b7 Départ entre 16h00 et 18h00',
    perm_keep_label:    'Je souhaite <strong>conserver</strong> mon jour de permanence',
    perm_keep_current:  'Jour actuel :',
    perm_keep_hint:     'Sélectionner votre créneau actuel :',
    perm_change_label:  'Je souhaite <strong>changer</strong> mon jour de permanence',
    perm_change_hint:   'Préciser par ordre de préférence (1 = préféré, 10 = moins souhaité) :',
    periods:            [['matin','Matin'],['AM','Après-midi']],
    opt_choose:         '— Choisir —',
    note_reg:           'Contrat régulier :',
    note_reg_val:       'une permanence de 3h30 tous les 15 jours.',
    note_occ:           'Présences occasionnelles :',
    note_occ_val:       'une permanence de 3h30 toutes les 10 présences.',
    note_groups_title:  'Créneaux habituels par groupe :',
    note_groups_body:   '🐙 <strong>Poulpes &amp; 🦀 Crabes</strong> (petits) — permanences habituellement l\'<strong>après-midi</strong> &nbsp;·&nbsp; 🐟 <strong>Poissons &amp; 🐢 Tortues</strong> (grands) — permanences habituellement le <strong>matin</strong>',
    footer1:            "Toute modification de ces vœux doit faire l'objet d'une validation par la Direction.",
    footer2:            '',
    footer3:            'Les demandes périscolaires du mercredi seront étudiées après la finalisation des inscriptions des nouvelles familles, au plus tard début juin.',
    dl_btn:             'Télécharger le PDF pré-rempli',
    dl_blank_btn:       'Télécharger une fiche vierge',
    drop_hint:          'Glisser un PDF pour pré-remplir le formulaire',
    no_cookie:          'Aucun cookie, aucune donnée envoyée. Brouillon sauvegardé localement dans votre navigateur.',
    debug:              'Debug',
    draft_restored:     '✓ Brouillon restauré depuis votre navigateur',
    draft_dismiss:      'OK',
    draft_clear:        'Effacer',
  },
  en: {
    title:              'Care Preference Form',
    subtitle:           '',
    since:              '',
    deadline:           '',
    card_child:         "Child information",
    card_structure:     "Preferred care facility",
    card_type:          "Preferred care type",
    card_days:          "Preferred care days",
    card_days_sub:      '7:30 \u2013 18:00',
    card_perm:          'Preferred duty shifts',
    card_perm_sub:      'morning 9h\u201312:30 \u00b7 afternoon 14:30\u201318h',
    label_lastname:     "Child's last name",
    label_firstname:    "Child's first name",
    label_birthdate:    'Date of birth',
    label_birthexpected:'Expected birth date',
    hint_born:          'Past date → child already born',
    hint_expected:      'Future date → birth expected',
    ph_lastname:        'e.g. Martin',
    ph_firstname:       'e.g. Lea',
    opt_petit_nemo:     'Petit Nemo',
    opt_baby_nemo:      'Baby Nemo',
    opt_indifferent:    'No preference',
    opt_regulier:       'Regular care',
    opt_occasionnel:    'Occasional care',
    days:               ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    de: 'from', a: 'to',
    vac:                'School holidays only',
    days_footnote:      'Arrival between 7:30 and 9:00 \u00b7 Departure between 16:00 and 18:00',
    perm_keep_label:    'I wish to <strong>keep</strong> my current duty day',
    perm_keep_current:  'Current day:',
    perm_keep_hint:     'Select your current slot:',
    perm_change_label:  'I wish to <strong>change</strong> my duty day',
    perm_change_hint:   'Please indicate in order of preference (1 = most preferred, 10 = least preferred):',
    periods:            [['matin','Morning'],['AM','Afternoon']],
    opt_choose:         '— Choose —',
    note_reg:           'Regular contract:',
    note_reg_val:       'a 3h30 duty shift every 15 days.',
    note_occ:           'Occasional attendance:',
    note_occ_val:       'a 3h30 duty shift every 10 attendances.',
    note_groups_title:  'Usual slots by group:',
    note_groups_body:   '🐙 <strong>Poulpes &amp; 🦀 Crabes</strong> (younger) — duty usually in the <strong>afternoon</strong> &nbsp;·&nbsp; 🐟 <strong>Poissons &amp; 🐢 Tortues</strong> (older) — duty usually in the <strong>morning</strong>',
    footer1:            'Any changes to these preferences must be approved by the Director.',
    footer2:            '',
    footer3:            'Wednesday after-school requests will be reviewed after finalising new family registrations, by early June at the latest.',
    dl_btn:             'Download pre-filled PDF',
    dl_blank_btn:       'Download a blank form',
    drop_hint:          'Drop a PDF to pre-fill the form',
    no_cookie:          'No cookies, nothing sent. Draft saved locally in your browser.',
    debug:              'Debug',
    draft_restored:     '✓ Draft restored from your browser',
    draft_dismiss:      'OK',
    draft_clear:        'Clear',
  },
  es: {
    title:              'Ficha de Deseos',
    subtitle:           '', since: '', deadline: '',
    card_child:         'Información del niño',
    card_structure:     'Estructura de acogida deseada',
    card_type:          'Tipo de acogida deseado',
    card_days:          'Días de acogida deseados',
    card_days_sub:      '7:30 \u2013 18:00',
    card_perm:          'Turnos de guardia deseados',
    card_perm_sub:      'mañana 9h\u201312:30 \u00b7 tarde 14:30\u201318h',
    label_lastname:     'Apellido del niño',
    label_firstname:    'Nombre del niño',
    label_birthdate:    'Fecha de nacimiento',
    label_birthexpected:'Fecha prevista de nacimiento',
    hint_born:          'Fecha pasada → niño ya nacido',
    hint_expected:      'Fecha futura → nacimiento previsto',
    ph_lastname:        'Ej.: Martín',
    ph_firstname:       'Ej.: Lía',
    opt_petit_nemo:     'Petit Nemo',
    opt_baby_nemo:      'Baby Nemo',
    opt_indifferent:    'Indiferente',
    opt_regulier:       'Acogida regular',
    opt_occasionnel:    'Acogida ocasional',
    days:               ['Lunes','Martes','Miércoles','Jueves','Viernes'],
    de: 'de', a: 'a',
    vac:                'Solo durante las vacaciones escolares',
    days_footnote:      'Llegada entre 7:30 y 9:00 \u00b7 Salida entre 16:00 y 18:00',
    perm_keep_label:    'Deseo <strong>conservar</strong> mi día de guardia',
    perm_keep_current:  'Día actual:',
    perm_keep_hint:     'Seleccione su horario actual:',
    perm_change_label:  'Deseo <strong>cambiar</strong> mi día de guardia',
    perm_change_hint:   'Indique por orden de preferencia (1 = preferido, 10 = menos deseado):',
    periods:            [['matin','Mañana'],['AM','Tarde']],
    opt_choose:         '— Elegir —',
    note_reg:           'Contrato regular:',
    note_reg_val:       'una guardia de 3h30 cada 15 días.',
    note_occ:           'Asistencia ocasional:',
    note_occ_val:       'una guardia de 3h30 cada 10 asistencias.',
    note_groups_title:  'Horarios habituales por grupo:',
    note_groups_body:   '🐙 <strong>Poulpes &amp; 🦀 Crabes</strong> (pequeños) — guardias habitualmente por la <strong>tarde</strong> &nbsp;·&nbsp; 🐟 <strong>Poissons &amp; 🐢 Tortues</strong> (mayores) — guardias habitualmente por la <strong>mañana</strong>',
    footer1:            'Cualquier modificación de estos deseos debe ser aprobada por la Dirección.',
    footer2:            '',
    footer3:            'Las solicitudes extraescolares del miércoles se revisarán tras la finalización de las inscripciones, a más tardar a principios de junio.',
    dl_btn:             'Descargar PDF pre-rellenado',
    dl_blank_btn:       'Descargar ficha en blanco',
    drop_hint:          'Arrastre un PDF para pre-rellenar el formulario',
    no_cookie:          'Sin cookies, nada enviado. Borrador guardado localmente en su navegador.',
    debug:              'Depuración',
    draft_restored:     '✓ Borrador restaurado desde su navegador',
    draft_dismiss:      'OK',
    draft_clear:        'Borrar',
  },
  de: {
    title:              'Wunschformular',
    subtitle:           '', since: '', deadline: '',
    card_child:         'Angaben zum Kind',
    card_structure:     'Gewünschte Betreuungseinrichtung',
    card_type:          'Gewünschte Betreuungsart',
    card_days:          'Gewünschte Betreuungstage',
    card_days_sub:      '7:30 \u2013 18:00',
    card_perm:          'Gewünschte Dienste',
    card_perm_sub:      'Vormittag 9\u201312:30 Uhr \u00b7 Nachmittag 14:30\u201318 Uhr',
    label_lastname:     'Nachname des Kindes',
    label_firstname:    'Vorname des Kindes',
    label_birthdate:    'Geburtsdatum',
    label_birthexpected:'Voraussichtlicher Geburtstermin',
    hint_born:          'Vergangenes Datum → Kind bereits geboren',
    hint_expected:      'Zukünftiges Datum → Geburt steht bevor',
    ph_lastname:        'z. B. Müller',
    ph_firstname:       'z. B. Lea',
    opt_petit_nemo:     'Petit Nemo',
    opt_baby_nemo:      'Baby Nemo',
    opt_indifferent:    'Egal',
    opt_regulier:       'Regelmäßige Betreuung',
    opt_occasionnel:    'Gelegentliche Betreuung',
    days:               ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag'],
    de: 'von', a: 'bis',
    vac:                'Nur während der Schulferien',
    days_footnote:      'Ankunft zwischen 7:30 und 9:00 \u00b7 Abfahrt zwischen 16:00 und 18:00',
    perm_keep_label:    'Ich möchte meinen Diensttag <strong>beibehalten</strong>',
    perm_keep_current:  'Aktueller Tag:',
    perm_keep_hint:     'Wählen Sie Ihren aktuellen Zeitraum:',
    perm_change_label:  'Ich möchte meinen Diensttag <strong>ändern</strong>',
    perm_change_hint:   'Nach Präferenz angeben (1 = bevorzugt, 10 = am wenigsten gewünscht):',
    periods:            [['matin','Vormittag'],['AM','Nachmittag']],
    opt_choose:         '— Wählen —',
    note_reg:           'Regelmäßiger Vertrag:',
    note_reg_val:       'ein 3:30-Dienst alle 15 Tage.',
    note_occ:           'Gelegentliche Anwesenheit:',
    note_occ_val:       'ein 3:30-Dienst alle 10 Anwesenheiten.',
    note_groups_title:  'Übliche Zeiten je Gruppe:',
    note_groups_body:   '🐙 <strong>Poulpes &amp; 🦀 Crabes</strong> (jüngere) — Dienste meist am <strong>Nachmittag</strong> &nbsp;·&nbsp; 🐟 <strong>Poissons &amp; 🐢 Tortues</strong> (ältere) — Dienste meist am <strong>Vormittag</strong>',
    footer1:            'Jede Änderung dieser Wünsche bedarf der Zustimmung der Leitung.',
    footer2:            '',
    footer3:            'Mittwochs-Nachschulbetreuungsanfragen werden nach Abschluss der Einschreibungen geprüft, spätestens Anfang Juni.',
    dl_btn:             'Vorausgefülltes PDF herunterladen',
    dl_blank_btn:       'Leeres Formular herunterladen',
    drop_hint:          'PDF hierher ziehen, um das Formular vorauszufüllen',
    no_cookie:          'Keine Cookies, nichts gesendet. Entwurf lokal in Ihrem Browser gespeichert.',
    debug:              'Debug',
    draft_restored:     '✓ Entwurf aus Ihrem Browser wiederhergestellt',
    draft_dismiss:      'OK',
    draft_clear:        'Löschen',
  },
  it: {
    title:              'Scheda dei Desideri',
    subtitle:           '', since: '', deadline: '',
    card_child:         'Informazioni sul bambino',
    card_structure:     'Struttura di accoglienza desiderata',
    card_type:          'Tipo di accoglienza desiderato',
    card_days:          'Giorni di accoglienza desiderati',
    card_days_sub:      '7:30 \u2013 18:00',
    card_perm:          'Turni di permanenza desiderati',
    card_perm_sub:      'mattina 9\u201312:30 \u00b7 pomeriggio 14:30\u201318',
    label_lastname:     'Cognome del bambino',
    label_firstname:    'Nome del bambino',
    label_birthdate:    'Data di nascita',
    label_birthexpected:'Data prevista di nascita',
    hint_born:          'Data passata → bambino già nato',
    hint_expected:      'Data futura → nascita prevista',
    ph_lastname:        'Es.: Rossi',
    ph_firstname:       'Es.: Lea',
    opt_petit_nemo:     'Petit Nemo',
    opt_baby_nemo:      'Baby Nemo',
    opt_indifferent:    'Indifferente',
    opt_regulier:       'Accoglienza regolare',
    opt_occasionnel:    'Accoglienza occasionale',
    days:               ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì'],
    de: 'dalle', a: 'alle',
    vac:                'Solo durante le vacanze scolastiche',
    days_footnote:      'Arrivo tra le 7:30 e le 9:00 \u00b7 Uscita tra le 16:00 e le 18:00',
    perm_keep_label:    'Desidero <strong>mantenere</strong> il mio giorno di permanenza',
    perm_keep_current:  'Giorno attuale:',
    perm_keep_hint:     'Seleziona il tuo turno attuale:',
    perm_change_label:  'Desidero <strong>cambiare</strong> il mio giorno di permanenza',
    perm_change_hint:   'Indicare in ordine di preferenza (1 = preferito, 10 = meno desiderato):',
    periods:            [['matin','Mattina'],['AM','Pomeriggio']],
    opt_choose:         '— Scegliere —',
    note_reg:           'Contratto regolare:',
    note_reg_val:       'un turno di 3h30 ogni 15 giorni.',
    note_occ:           'Presenze occasionali:',
    note_occ_val:       'un turno di 3h30 ogni 10 presenze.',
    note_groups_title:  'Orari abituali per gruppo:',
    note_groups_body:   '🐙 <strong>Poulpes &amp; 🦀 Crabes</strong> (piccoli) — turni solitamente di <strong>pomeriggio</strong> &nbsp;·&nbsp; 🐟 <strong>Poissons &amp; 🐢 Tortues</strong> (grandi) — turni solitamente di <strong>mattina</strong>',
    footer1:            'Qualsiasi modifica a questi desideri deve essere approvata dalla Direzione.',
    footer2:            '',
    footer3:            'Le richieste extrascolastiche del mercoledì saranno esaminate dopo la finalizzazione delle iscrizioni, al più tardi all\'inizio di giugno.',
    dl_btn:             'Scarica PDF pre-compilato',
    dl_blank_btn:       'Scarica scheda in bianco',
    drop_hint:          'Trascina un PDF per pre-compilare il modulo',
    no_cookie:          'Nessun cookie, nulla inviato. Bozza salvata localmente nel browser.',
    debug:              'Debug',
    draft_restored:     '✓ Bozza ripristinata dal browser',
    draft_dismiss:      'OK',
    draft_clear:        'Cancella',
  },
  pr: {
    title:              "Arrr ! Registre du Cap'taine",
    subtitle:           '', since: '', deadline: '',
    card_child:         'Renseignements sur le moussaillon',
    card_structure:     "Navire d'accueil souhaité",
    card_type:          'Façon de naviguer',
    card_days:          'Jours en mer souhaités',
    card_days_sub:      '7h30 \u2013 18h00, tonnerre de Brest',
    card_perm:          'Quarts à tenir',
    card_perm_sub:      "matin 9h\u201312h30 \u00b7 après-midi 14h30\u201318h, mille sabords",
    label_lastname:     'Nom du moussaillon',
    label_firstname:    'Petit nom du moussaillon',
    label_birthdate:    'Mis à la mer le',
    label_birthexpected:'Arrivée prévue au port',
    hint_born:          'Date passée → le moussaillon a déjà touché terre',
    hint_expected:      'Date future → le moussaillon vogue vers nous',
    ph_lastname:        'Ex : Barbe-Noire',
    ph_firstname:       'Ex : Anne Bonny',
    opt_petit_nemo:     'Petit Nemo',
    opt_baby_nemo:      'Baby Nemo',
    opt_indifferent:    "N'importe quel port",
    opt_regulier:       'Navigation régulière',
    opt_occasionnel:    'Équipées occasionnelles',
    days:               ['Lundi','Mardi','Mercredi','Jeudi','Vendredi'],
    de: 'de', a: 'à',
    vac:                'Seulement pendant les escales scolaires',
    days_footnote:      'Appareillage entre 7h30 et 9h00 \u00b7 Retour au port entre 16h00 et 18h00',
    perm_keep_label:    'Je veux <strong>garder</strong> mon quart, sacrebleu',
    perm_keep_current:  'Quart actuel :',
    perm_keep_hint:     'Choisis ton créneau actuel, matelot :',
    perm_change_label:  'Je veux <strong>changer</strong> de quart, mille sabords',
    perm_change_hint:   'Classe par ordre de préférence (1 = favori, 10 = moins souhaité) :',
    periods:            [['matin','Matin'],['AM','Après-midi']],
    opt_choose:         '— Choisis, foutredieu —',
    note_reg:           'Contrat régulier :',
    note_reg_val:       'un quart de 3h30 toutes les deux semaines, morbleu.',
    note_occ:           'Présences occasionnelles :',
    note_occ_val:       'un quart de 3h30 toutes les 10 apparitions sur le pont.',
    note_groups_title:  "Quarts habituels par équipage :",
    note_groups_body:   '🐙 <strong>Poulpes &amp; 🦀 Crabes</strong> (mousses) — quarts d\'habitude l\'<strong>après-midi</strong> &nbsp;·&nbsp; 🐟 <strong>Poissons &amp; 🐢 Tortues</strong> (vieux loups de mer) — quarts d\'habitude le <strong>matin</strong>',
    footer1:            "Toute modif' de ces vœux doit être validée par le Cap'taine.",
    footer2:            '',
    footer3:            "Les demandes de mercredi seront examinées une fois le rôle d'équipage bouclé, au plus tard début juin.",
    dl_btn:             'Piller le parchemin pré-rempli',
    dl_blank_btn:       'Piller un parchemin vierge',
    drop_hint:          'Largue un PDF sur le pont pour remplir le parchemin, moussaillon',
    no_cookie:          "Pas un biscuit, rien envoyé. Parchemin gardé dans ta cale de navigateur, moussaillon.",
    debug:              'Boussole secrète',
    draft_restored:     "✓ Parchemin retrouvé dans ta cale, mille sabords !",
    draft_dismiss:      'Paré',
    draft_clear:        'À la mer',
  }
};

let lang = 'fr';

function setLang(l) {
  lang = l;
  document.getElementById('btnFR').classList.toggle('active', l === 'fr');
  document.getElementById('btnEN').classList.toggle('active', l === 'en');
  const t = T[l];

  // Text nodes — these are trusted i18n strings, not user input
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  rebuildDays();
  rebuildPermGrid();
  rebuildPermKeepGrid();

  // Birth date label
  updateChildDateLabel();

  // Download buttons
  const dlLabel = document.querySelector('.btn-download-label');
  if (dlLabel) dlLabel.textContent = t.dl_btn;
  const dlBlankLabel = document.querySelector('.btn-download-blank-label');
  if (dlBlankLabel) dlBlankLabel.textContent = t.dl_blank_btn;
}

/* ──────────────────────────────────────────────
   Debug toggle — show live QR/N1 preview card
────────────────────────────────────────────── */
function toggleDebug() {
  const on = document.getElementById('debugToggle').checked;
  document.getElementById('qrCard').hidden = !on;
}

function pickFooterLang(sel) {
  const v = sel.value;
  if (v) setLang(v);
  sel.selectedIndex = 0;
}

/* ──────────────────────────────────────────────
   Time slider constants
   Range: 7h30 (450 min) → 18h00 (1080 min), step 15 min
   Forced: start ≤ 9h00 (540), end ≥ 16h00 (960)
────────────────────────────────────────────── */
const RANGE_MIN      = 450;  // 7h30
const RANGE_MAX      = 1080; // 18h00
const START_MAX      = 540;  // 9h00  — arrival must be before 9am
const END_MIN        = 960;  // 16h00 — departure must be after 4pm
const DEFAULT_START  = 510;  // 8h30
const DEFAULT_END    = 1020; // 17h00

function sliderPct(v) {
  return (v - RANGE_MIN) / (RANGE_MAX - RANGE_MIN) * 100;
}

function updateSlider(d, changed) {
  const startEl = document.getElementById(`${d}_start`);
  const endEl   = document.getElementById(`${d}_end`);
  let s = parseInt(startEl.value);
  let e = parseInt(endEl.value);

  // Enforce constraints
  s = Math.min(s, START_MAX);
  e = Math.max(e, END_MIN);
  if (changed === 'start' && s > e) s = e;
  if (changed === 'end'   && e < s) e = s;
  startEl.value = s;
  endEl.value   = e;

  const fill = document.getElementById(`fill_${d}`);
  fill.style.left  = sliderPct(s) + '%';
  fill.style.width = (sliderPct(e) - sliderPct(s)) + '%';

  document.getElementById(`${d}_start_lbl`).textContent = minsToTime(s);
  document.getElementById(`${d}_end_lbl`).textContent   = minsToTime(e);
}

/* ──────────────────────────────────────────────
   Build days grid
────────────────────────────────────────────── */
const dayState = {};
let skipDayStateRead = false;

function rebuildDays() {
  const t = T[lang];
  // Save current state from DOM (unless externally pre-set)
  if (!skipDayStateRead) {
    T.fr.days.forEach(day => {
      const d = day.toLowerCase();
      const se = document.getElementById(`${d}_start`);
      const ee = document.getElementById(`${d}_end`);
      dayState[d] = {
        checked: document.getElementById(`day_${d}`)?.checked ?? false,
        start:   se ? parseInt(se.value) : DEFAULT_START,
        end:     ee ? parseInt(ee.value) : DEFAULT_END,
      };
    });
  }
  skipDayStateRead = false;

  const daysGrid = document.getElementById('daysGrid');
  daysGrid.innerHTML = '';
  t.days.forEach((dayLabel, i) => {
    const d   = T.fr.days[i].toLowerCase();
    const st  = dayState[d] || { checked: false, start: DEFAULT_START, end: DEFAULT_END };
    const on  = st.checked;
    const sv  = st.start, ev = st.end;

    const row = document.createElement('div');
    row.className = 'day-row' + (on ? ' active' : '');
    row.id = `row_${d}`;

    const dayCheck = document.createElement('div');
    dayCheck.className = 'day-check';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = `day_${d}`;
    cb.checked = on;
    cb.onchange = () => toggleDay(d);
    dayCheck.appendChild(cb);

    const dayLbl = document.createElement('div');
    dayLbl.className = 'day-label';
    dayLbl.textContent = dayLabel;

    const dayTimes = document.createElement('div');
    dayTimes.className = 'day-times';
    dayTimes.innerHTML = [
      '<div class="time-badges">',
        `<span class="time-badge" id="${d}_start_lbl">${minsToTime(sv)}</span>`,
        '<span class="time-sep">\u2192</span>',
        `<span class="time-badge" id="${d}_end_lbl">${minsToTime(ev)}</span>`,
      '</div>',
      '<div class="range-wrap">',
        '<div class="range-track">',
          `<div class="range-zone" style="left:0;width:${sliderPct(START_MAX)}%"></div>`,
          `<div class="range-zone" style="left:${sliderPct(END_MIN)}%;right:0;width:auto"></div>`,
        '</div>',
        `<div class="range-fill" id="fill_${d}" style="left:${sliderPct(sv)}%;width:${sliderPct(ev)-sliderPct(sv)}%"></div>`,
        `<input type="range" id="${d}_start" min="${RANGE_MIN}" max="${RANGE_MAX}" step="15" value="${sv}" oninput="updateSlider('${d}','start')">`,
        `<input type="range" id="${d}_end" min="${RANGE_MIN}" max="${RANGE_MAX}" step="15" value="${ev}" oninput="updateSlider('${d}','end')">`,
      '</div>',
    ].join('');

    row.appendChild(dayCheck);
    row.appendChild(dayLbl);
    row.appendChild(dayTimes);
    daysGrid.appendChild(row);
  });
}

function toggleDay(d) {
  const on = document.getElementById(`day_${d}`).checked;
  document.getElementById(`row_${d}`).classList.toggle('active', on);
  scheduleQR();
}

/* ──────────────────────────────────────────────
   Permanence keep grid — single selection
────────────────────────────────────────────── */
let permKeepSelected = null; // e.g. "keep_lundi_matin"

function rebuildPermKeepGrid() {
  const t = T[lang];
  const grid = document.getElementById('permKeepGrid');
  grid.innerHTML = '';
  t.periods.forEach(([v, label]) => {
    const title = document.createElement('div');
    title.className = 'perm-period-title';
    title.textContent = label;
    grid.appendChild(title);
    t.days.forEach((dayLabel, i) => {
      const id = `keep_${T.fr.days[i].toLowerCase()}_${v}`;
      const sel = permKeepSelected === id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'perm-day-btn' + (sel ? ' ranked' : '');
      btn.id = `btn_${id}`;
      btn.onclick = () => togglePermKeep(id);
      const spanLabel = document.createElement('span');
      spanLabel.textContent = dayLabel;
      btn.appendChild(spanLabel);
      if (sel) {
        const check = document.createElement('span');
        check.className = 'rank-badge';
        check.textContent = '\u2713';
        btn.appendChild(check);
      }
      grid.appendChild(btn);
    });
  });
}

function togglePermKeep(id) {
  permKeepSelected = (permKeepSelected === id) ? null : id;
  rebuildPermKeepGrid();
  scheduleQR();
}

/* ──────────────────────────────────────────────
   Permanence change grid — ranked selection
────────────────────────────────────────────── */
// ranks: { id: rankNumber } — rank 0 = unranked
const permRanks = {};

function rebuildPermGrid() {
  const t = T[lang];
  const permGrid = document.getElementById('permChangeGrid');
  permGrid.innerHTML = '';
  t.periods.forEach(([v, label]) => {
    const title = document.createElement('div');
    title.className = 'perm-period-title';
    title.textContent = label;
    permGrid.appendChild(title);
    t.days.forEach((dayLabel, i) => {
      const id  = `perm_${T.fr.days[i].toLowerCase()}_${v}`;
      const rank = permRanks[id] || 0;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'perm-day-btn' + (rank ? ' ranked' : '');
      btn.id = `btn_${id}`;
      btn.dataset.permId = id;
      btn.onclick = () => togglePermRank(id);
      const spanLabel = document.createElement('span');
      spanLabel.textContent = dayLabel;
      btn.appendChild(spanLabel);
      if (rank) {
        const badge = document.createElement('span');
        badge.className = 'rank-badge';
        badge.textContent = rank;
        btn.appendChild(badge);
      }
      permGrid.appendChild(btn);
    });
  });
}

function togglePermRank(id) {
  const currentRank = permRanks[id] || 0;
  if (currentRank) {
    // Remove: shift all higher ranks down
    const removed = currentRank;
    delete permRanks[id];
    Object.keys(permRanks).forEach(k => {
      if (permRanks[k] > removed) permRanks[k]--;
    });
  } else {
    // Assign next rank
    const maxRank = Math.max(0, ...Object.values(permRanks));
    permRanks[id] = maxRank + 1;
  }
  rebuildPermGrid();
  scheduleQR();
}

/* ──────────────────────────────────────────────
   Radio pill highlighting
────────────────────────────────────────────── */
document.querySelectorAll('.radio-pill input').forEach(input => {
  input.addEventListener('change', () => {
    const group = input.closest('.radio-group');
    group.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
    input.closest('.radio-pill').classList.add('selected');
  });
});

document.getElementById('vacScolaires').addEventListener('change', e => {
  document.getElementById('vacLabel').classList.toggle('selected', e.target.checked);
});

/* ──────────────────────────────────────────────
   Birth date auto-detect: born vs expected
────────────────────────────────────────────── */
function updateChildDateLabel() {
  const input = document.getElementById('childDate');
  const label = document.getElementById('childDateLabel');
  const hint  = document.getElementById('childDateHint');
  const t = T[lang];

  if (!input.value) {
    label.textContent = t.label_birthdate + ' / ' + t.label_birthexpected;
    hint.textContent = '';
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const picked = new Date(input.value + 'T00:00:00');

  if (picked <= today) {
    label.textContent = t.label_birthdate;
    hint.textContent = t.hint_born;
  } else {
    label.textContent = t.label_birthexpected;
    hint.textContent = t.hint_expected;
  }
}

document.getElementById('childDate').addEventListener('change', updateChildDateLabel);

/* ──────────────────────────────────────────────
   Permanence radio selection
────────────────────────────────────────────── */
function selectPerm(v) {
  document.getElementById('permKeep').checked   = v === 'keep';
  document.getElementById('permChange').checked = v === 'change';
  document.getElementById('permKeepOpt').classList.toggle('selected',   v === 'keep');
  document.getElementById('permChangeOpt').classList.toggle('selected', v === 'change');
  scheduleQR();
}

/* ──────────────────────────────────────────────
   Initial build
────────────────────────────────────────────── */
rebuildDays();
rebuildPermGrid();
rebuildPermKeepGrid();

// Sync permanence visual state (handles browser-restored form values)
const checkedPerm = document.querySelector('input[name="permanence"]:checked');
if (checkedPerm) selectPerm(checkedPerm.value);

// pdf.js worker
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';
}

// Load config and apply date-dependent strings, then check URL for import code
loadConfig().then(() => {
  const urlCode = new URLSearchParams(window.location.search).get('code');
  let restoredFromUrl = false;
  if (urlCode && urlCode.startsWith('N1')) {
    try {
      const compact = decodeQRBinary(urlCode);
      if (compact) { fillFormFromData(expandCompactToObj(compact)); restoredFromUrl = true; }
    } catch (e) { console.error('URL code import failed:', e); }
  }
  // Auto-restore from localStorage draft if no URL code was used
  if (!restoredFromUrl && loadDraft()) {
    document.getElementById('draftBanner').hidden = false;
  }
  draftReady = true;
});

/* ──────────────────────────────────────────────
   QR Code — live preview
────────────────────────────────────────────── */
const qrCanvas = document.getElementById('qrPreview');
const qr = typeof QRious !== 'undefined' ? new QRious({ element: qrCanvas, size: 120, level: 'L' }) : null;

function buildCompactData() {
  const STRUCT_MAP = { petit_nemo:'p', baby_nemo:'b', indifferent:'i' };
  const TYPE_MAP   = { regulier:'r', occasionnel:'o' };
  const structVal  = radio('structure');
  const typeVal    = radio('typeAccueil');
  const childDate  = val('childDate');
  let dateType = null;
  if (childDate) {
    const t = new Date(); t.setHours(0,0,0,0);
    dateType = new Date(childDate + 'T00:00:00') <= t ? 'b' : 'e';
  }
  const days = T.fr.days.map(day => {
    const d = day.toLowerCase();
    const on = chk(`day_${d}`);
    return on ? [minsToTime(parseInt(val(`${d}_start`) || DEFAULT_START)),
                 minsToTime(parseInt(val(`${d}_end`)   || DEFAULT_END))] : null;
  });
  const pc = radio('permanence');
  let permData = null;
  if (pc === 'keep' && permKeepSelected) {
    permData = ['k', permKeepSelected.replace('keep_', '')];
  } else if (pc === 'change' && Object.keys(permRanks).length) {
    const ranks = {};
    Object.entries(permRanks).forEach(([id, rank]) => { ranks[id.replace('perm_', '')] = rank; });
    permData = ['c', ranks];
  }
  return [
    1,
    [val('childLastName'), val('childFirstName'), childDate || null, dateType],
    STRUCT_MAP[structVal] || null,
    TYPE_MAP[typeVal] || null,
    days,
    chk('vacScolaires') ? 1 : 0,
    permData,
  ];
}

function updateQR() {
  const compact = buildCompactData();
  const code = encodeQRBinary(compact);
  if (qr) qr.value = code;
  const codeEl = document.getElementById('importCode');
  if (codeEl) codeEl.textContent = code;
  saveDraft(compact, code);
}

/* ──────────────────────────────────────────────
   Draft autosave (localStorage)
────────────────────────────────────────────── */
const DRAFT_KEY = 'nemo-draft-v1';
let draftReady = false;

function isEmptyCompact(c) {
  if (!Array.isArray(c)) return true;
  const [, child, struct, type, days, vac, perm] = c;
  const [ln, fn, dt] = child || [];
  if (ln || fn || dt) return false;
  if (struct || type) return false;
  if (Array.isArray(days) && days.some(d => d)) return false;
  if (vac) return false;
  if (perm) return false;
  return true;
}

function saveDraft(compact, code) {
  if (!draftReady) return;
  try {
    if (isEmptyCompact(compact)) localStorage.removeItem(DRAFT_KEY);
    else localStorage.setItem(DRAFT_KEY, code);
  } catch (e) { /* quota / disabled — ignore */ }
}

function loadDraft() {
  try {
    const code = localStorage.getItem(DRAFT_KEY);
    if (!code || !code.startsWith('N1')) return false;
    const compact = decodeQRBinary(code);
    if (!compact) return false;
    fillFormFromData(expandCompactToObj(compact));
    return true;
  } catch (e) { return false; }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
}

function dismissDraftBanner() {
  document.getElementById('draftBanner').hidden = true;
}

// Debounced live update
let qrTimer = null;
function scheduleQR() { clearTimeout(qrTimer); qrTimer = setTimeout(updateQR, 300); }

// Listen to all form changes
document.querySelector('.form-body').addEventListener('input', scheduleQR);
document.querySelector('.form-body').addEventListener('change', scheduleQR);

// Initial QR
updateQR();

/* ──────────────────────────────────────────────
   Helpers
────────────────────────────────────────────── */
function val(id)  { const e = document.getElementById(id); return e ? e.value : ''; }
function chk(id)  { const e = document.getElementById(id); return e ? e.checked : false; }
function radio(name) { const e = document.querySelector(`input[name="${name}"]:checked`); return e ? e.value : ''; }
const _readers = { val, chk, radio };

function fmtDate(s) {
  if (!s) return '';
  const [y,m,d] = s.split('-');
  return `${d}/${m}/${y}`;
}

/* ──────────────────────────────────────────────
   PDF Generation
────────────────────────────────────────────── */
function generatePDF(opts) {
  const blank = !!(opts && opts.blank);
  // When blank, all form-reader calls return empty/false so the PDF renders as a clean hand-fillable form.
  const val   = blank ? () => ''    : _readers.val;
  const chk   = blank ? () => false : _readers.chk;
  const radio = blank ? () => ''    : _readers.radio;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const PW = 210, ML = 14, MR = 14, CW = PW - ML - MR;

  // Colour helpers
  const C = {
    blue:  [26, 95, 122],
    blueLt:[232,244,248],
    red:   [192, 57, 43],
    black: [26, 26, 26],
    muted: [107,114,128],
    white: [255,255,255],
    border:[209,213,219],
    note:  [120, 53, 15],
    noteBg:[255,251,235],
  };

  function tc(...rgb) { doc.setTextColor(...rgb); }
  function dc(...rgb) { doc.setDrawColor(...rgb); }
  function fc(...rgb) { doc.setFillColor(...rgb); }
  function lw(w)      { doc.setLineWidth(w); }
  function font(style, size) { doc.setFont('helvetica', style); if (size) doc.setFontSize(size); }

  function filledRect(x,y,w,h, ...rgb) { fc(...rgb); dc(...rgb); doc.rect(x,y,w,h,'F'); }
  function strokedRect(x,y,w,h, ...rgb) { dc(...(rgb.length ? rgb : C.border)); lw(0.3); doc.rect(x,y,w,h,'S'); }

  function checkbox(x, y, isChecked) {
    lw(0.35); dc(...C.muted);
    doc.rect(x, y - 2.8, 3.4, 3.4);
    if (isChecked) {
      lw(0.6); dc(...C.blue);
      doc.line(x+0.4, y-1.2, x+1.4, y-0.1);
      doc.line(x+1.4, y-0.1, x+3.0, y-2.6);
    }
  }

  function sectionHeader(label, yPos) {
    filledRect(ML, yPos - 3.5, CW, 7, ...C.blueLt);
    lw(0.3); dc(...C.blue);
    doc.rect(ML, yPos - 3.5, CW, 7);
    tc(...C.blue); font('bold', 8.5);
    doc.text(label.toUpperCase(), ML + 3, yPos);
    return yPos + 7;
  }

  let y = 10;

  // ── Banner (print-friendly: no dark fill) ──
  filledRect(0, 0, PW, 22, ...C.blueLt);
  lw(0.5); dc(...C.blue);
  doc.line(0, 22, PW, 22);
  tc(...C.blue); font('bold', 15);
  doc.text('Fiche de V\u0153ux', PW/2, y, { align:'center' });
  y += 5;
  font('normal', 9); tc(...C.black);
  doc.text(`Petit N\u00e9mo \u00b7 Souhaits d'accueil pour l'ann\u00e9e ${CFG.year}`, PW/2, y, { align:'center' });
  y += 3.5;
  font('normal', 7.5); tc(...C.muted);
  doc.text(`Accueil \u00e0 partir du ${fmtLong(CFG.careStart, 'fr-FR')}`, PW/2, y, { align:'center' });
  y += 4;

  // ── Deadline bar ──
  filledRect(0, y, PW, 7.5, 255, 242, 242);
  lw(0.5); dc(...C.red);
  doc.line(0, y, PW, y);
  tc(...C.red); font('bold', 8.5);
  doc.text(`\u00c0 nous retourner avant le ${fmtLong(CFG.deadline, 'fr-FR')}`, PW/2, y + 5, { align:'center' });
  y += 11;

  // ── Enfant ──
  y = sectionHeader("Informations sur l'enfant", y);
  y += 3;

  const lastV  = val('childLastName');
  const firstV = val('childFirstName');

  // Determine if date is birth or expected based on today
  const childDateVal = val('childDate');
  let bdV = '', beV = '';
  if (childDateVal) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(childDateVal + 'T00:00:00');
    if (picked <= today) {
      bdV = fmtDate(childDateVal);
    } else {
      beV = fmtDate(childDateVal);
    }
  }

  // Two-row layout to avoid overflow
  const halfW = CW / 2 - 2;

  // Row 1: Nom + Prénom
  font('bold', 7.5); tc(...C.muted);
  doc.text("NOM", ML, y);
  doc.text("PR\u00c9NOM", ML + halfW + 4, y);
  y += 3.5;
  strokedRect(ML, y, halfW, 7);
  font('normal', 9); tc(...C.black);
  doc.text(lastV, ML + 2, y + 4.8);

  strokedRect(ML + halfW + 4, y, halfW, 7);
  font('normal', 9); tc(...C.black);
  doc.text(firstV, ML + halfW + 6, y + 4.8);
  y += 11;

  // Row 2: Né(e) le + Naissance prévue le
  font('bold', 7.5); tc(...C.muted);
  doc.text("N\u00c9(E) LE", ML, y);
  doc.text("NAISSANCE PR\u00c9VUE LE", ML + halfW + 4, y);
  y += 3.5;
  strokedRect(ML, y, halfW, 7);
  font('normal', 9); tc(...C.black);
  doc.text(bdV, ML + 2, y + 4.8);

  strokedRect(ML + halfW + 4, y, halfW, 7);
  font('normal', 9); tc(...C.black);
  doc.text(beV, ML + halfW + 6, y + 4.8);

  y += 12;

  // ── Structure + Type ──
  y = sectionHeader("Structure & Type d'accueil", y);
  y += 4;

  const structure = radio('structure');
  const type      = radio('typeAccueil');

  font('bold', 8); tc(...C.muted);
  doc.text('STRUCTURE SOUHAIT\u00c9E', ML, y);
  y += 4.5;
  [{l:'Petit Nemo',v:'petit_nemo'},{l:'Baby Nemo',v:'baby_nemo'},{l:'Indiff\u00e9rent',v:'indifferent'}].forEach(o => {
    checkbox(ML, y, structure === o.v);
    font('normal', 9); tc(...C.black);
    doc.text(o.l, ML + 5.5, y);
    y += 5.5;
  });

  // reset y to draw type alongside
  y -= 16.5;
  font('bold', 8); tc(...C.muted);
  doc.text("TYPE D'ACCUEIL", ML + 75, y);
  y += 4.5;
  [{l:'Accueil r\u00e9gulier',v:'regulier'},{l:'Accueil occasionnel',v:'occasionnel'}].forEach(o => {
    checkbox(ML + 75, y, type === o.v);
    font('normal', 9); tc(...C.black);
    doc.text(o.l, ML + 80.5, y);
    y += 5.5;
  });
  y += 4;

  // ── Days ──
  y = sectionHeader("Jours d'accueil souhait\u00e9s (7h30 \u2013 18h00)", y);
  y += 3;

  T.fr.days.forEach((day, di) => {
    const d = day.toLowerCase();
    const dispDay = T[lang].days[di] || day;
    const on    = chk(`day_${d}`);
    const startM = parseInt(val(`${d}_start`) || DEFAULT_START);
    const endM   = parseInt(val(`${d}_end`)   || DEFAULT_END);

    // Row background
    if (on) filledRect(ML, y - 3.5, CW, 7.5, ...C.blueLt);
    lw(0.25); dc(...C.border);
    doc.rect(ML, y - 3.5, CW, 7.5);

    // Checkbox
    checkbox(ML + 2, y, on);

    // Day name
    font(on ? 'bold' : 'normal', 9);
    const dayColor = on ? C.blue : C.black; tc(...dayColor);
    doc.text(dispDay, ML + 8, y);

    // Time
    font('normal', 9); tc(...C.muted);
    doc.text('de', ML + 38, y);
    tc(...C.black);
    const fromS = on ? minsToTime(startM) : '\u2013 \u2013';
    const toS   = on ? minsToTime(endM)   : '\u2013 \u2013';
    doc.text(fromS, ML + 45, y);
    tc(...C.muted);
    doc.text('\u00e0', ML + 62, y);
    tc(...C.black);
    doc.text(toS, ML + 68, y);

    y += 8;
  });

  y += 2;
  // Vacation checkbox
  checkbox(ML, y, chk('vacScolaires'));
  font('normal', 8.5); tc(...C.black);
  doc.text('Uniquement pendant les vacances scolaires', ML + 5.5, y);
  y += 9;

  // ── Permanences ──
  y = sectionHeader('Permanences souhait\u00e9es', y);
  y += 3;

  const permChoice = radio('permanence');

  // Keep
  const keepSel = permChoice === 'keep';
  if (keepSel) filledRect(ML, y - 3.5, CW, 12, ...C.blueLt);
  lw(0.25); dc(...C.border); doc.rect(ML, y - 3.5, CW, keepSel ? 12 : 7.5);
  checkbox(ML + 2, y, keepSel);
  font('normal', 9); tc(...C.black);
  doc.text('Je souhaite conserver mon jour de permanence :', ML + 8, y);

  // Show selected slot inline
  let keepLabel = '';
  if (!blank && permKeepSelected) {
    const parts = permKeepSelected.replace('keep_', '').split('_');
    const dayKey = parts[0];
    const periodKey = parts[1];
    const frDays = T.fr.days;
    const dayIdx = frDays.findIndex(d => d.toLowerCase() === dayKey);
    const dispDay = dayIdx >= 0 ? (T[lang].days[dayIdx] || frDays[dayIdx]) : dayKey;
    const dispPeriod = T[lang].periods.find(p => p[0] === periodKey);
    keepLabel = dispDay + ' ' + (dispPeriod ? dispPeriod[1] : periodKey);
  }
  font('bold', 9); tc(...C.blue);
  doc.text(keepLabel, ML + 82, y);
  lw(0.3); dc(...C.border);
  doc.line(ML + 81, y + 1, ML + 81 + 50, y + 1);
  y += keepSel ? 12 : 9;

  // Change
  const changeSel = permChoice === 'change';
  const changeH = changeSel ? 32 : 7.5;
  if (changeSel) filledRect(ML, y - 3.5, CW, changeH, ...C.blueLt);
  lw(0.25); dc(...C.border); doc.rect(ML, y - 3.5, CW, changeH);
  checkbox(ML + 2, y, changeSel);
  font('normal', 9); tc(...C.black);
  doc.text("Je souhaite changer mon jour de permanence (ordre de pr\u00e9f\u00e9rence) :", ML + 8, y);
  y += 6;

  if (changeSel) {
    const ranked = Object.entries(permRanks).sort((a,b) => a[1]-b[1]);
    const frDays = T.fr.days;
    ['matin','AM'].forEach(period => {
      let gx = ML + 3;
      frDays.forEach(day => {
        const id   = `perm_${day.toLowerCase()}_${period}`;
        const rank = permRanks[id] || 0;
        const sel  = rank > 0;
        if (sel) { fc(...C.blueLt); dc(...C.blue); } else { fc(255,255,255); dc(...C.border); }
        lw(0.3);
        doc.rect(gx, y - 3.5, 35, 6.5, sel ? 'FD' : 'S');
        font('bold', 8); tc(...(sel ? C.blue : C.muted));
        if (sel) doc.text(String(rank), gx + 2, y);
        font('normal', 8);
        const sc = sel ? C.blue : C.black; tc(...sc);
        const dispDay = T[lang].days[frDays.indexOf(day)] || day;
        doc.text(dispDay, gx + (sel ? 7 : 3), y);
        gx += 36;
      });
      y += 7;
    });
    y += 1;
  } else {
    y += 4;
  }

  // Contract note (compact, after options)
  tc(...C.muted); font('italic', 7);
  doc.text('Contrat r\u00e9gulier : une permanence de 3h30 tous les 15 jours.  \u2014  Pr\u00e9sences occasionnelles : une permanence de 3h30 toutes les 10 pr\u00e9sences.', ML, y, { maxWidth: CW });
  y += 5;

  // Groups note (blue box)
  filledRect(ML, y, CW, 16, 240, 249, 255);
  lw(0.4); dc(125, 211, 252);
  doc.rect(ML, y, CW, 16);
  tc(12, 74, 110); font('bold', 8);
  doc.text('Cr\u00e9neaux habituels par groupe :', ML + 3, y + 4.5);
  font('normal', 8);
  doc.text('Poulpes & Crabes (petits) \u2014 permanences habituellement l\'apr\u00e8s-midi', ML + 3, y + 9.5);
  doc.text('Poissons & Tortues (grands) \u2014 permanences habituellement le matin', ML + 3, y + 14);
  y += 20;

  // ── Footer ──
  lw(0.3); dc(...C.border);
  doc.line(ML, y, ML + CW, y);
  y += 4;
  tc(...C.muted); font('normal', 7.5);
  const footer = [
    "Toute modification de ces v\u0153ux doit faire l'objet d'une validation par la Direction.",
    `Nous donnerons suite \u00e0 votre demande au plus tard le ${fmtLong(CFG.responseBy, 'fr-FR')}.`,
    "Les demandes p\u00e9riscolaires du mercredi seront \u00e9tudi\u00e9es apr\u00e8s la finalisation des inscriptions, au plus tard d\u00e9but juin.",
  ];
  footer.forEach(line => { doc.text(line, ML, y, { maxWidth: CW }); y += 4.5; });

  // ── Embed form data in PDF (skipped for blank form) ──
  const metaProps = {
    title: `Fiche de V\u0153ux \u2013 Petit N\u00e9mo ${CFG.year}`,
    creator: 'Petit N\u00e9mo \u2013 Fiche de V\u0153ux',
  };
  if (!blank) {
    const compactData = buildCompactData();
    const expandedData = expandCompactToObj(compactData);
    const qrCodeStr = encodeQRBinary(compactData);
    metaProps.subject = JSON.stringify(expandedData);

    // ── QR code (compact binary) on lower right ──
    if (typeof QRious !== 'undefined') {
      const qrPdf = new QRious({ size: 256, level: 'L', value: qrCodeStr });
      const qrImg = qrPdf.toDataURL('image/png');
      const qrSize = 25;
      const qrX = PW - ML - qrSize;
      const qrY = 297 - 10 - qrSize;
      doc.addImage(qrImg, 'PNG', qrX, qrY, qrSize, qrSize);

      // Import code text next to QR
      tc(...C.muted); font('normal', 5);
      doc.text('Code d\'import :', ML, qrY);
      font('normal', 5.5); tc(...C.black);
      const codeLines = doc.splitTextToSize(qrCodeStr, qrX - ML - 4);
      doc.text(codeLines, ML, qrY + 4);
    }
  }
  doc.setProperties(metaProps);

  // Build filename
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const dateStr = `${yyyy}-${mm}-${dd}`;
  const lastName = val('childLastName').trim().replace(/\s+/g, '_') || 'enfant';
  const fname = blank
    ? `Fiche_Voeux_PetitNemo_${CFG.year}_vierge.pdf`
    : `Fiche_Voeux_PetitNemo_${CFG.year}_${lastName}_${dateStr}.pdf`;
  doc.save(fname);
}

/* ──────────────────────────────────────────────
   Clear form
────────────────────────────────────────────── */
function clearForm() {
  clearDraft();
  dismissDraftBanner();
  document.getElementById('childLastName').value = '';
  document.getElementById('childFirstName').value = '';
  document.getElementById('childDate').value = '';
  updateChildDateLabel();

  document.querySelectorAll('input[name="structure"], input[name="typeAccueil"]').forEach(r => {
    r.checked = false;
    r.closest('.radio-pill').classList.remove('selected');
  });

  T.fr.days.forEach(day => {
    dayState[day.toLowerCase()] = { checked: false, start: DEFAULT_START, end: DEFAULT_END };
  });
  skipDayStateRead = true;
  rebuildDays();

  const vacEl = document.getElementById('vacScolaires');
  vacEl.checked = false;
  document.getElementById('vacLabel').classList.remove('selected');

  document.querySelectorAll('input[name="permanence"]').forEach(r => r.checked = false);
  document.getElementById('permKeepOpt').classList.remove('selected');
  document.getElementById('permChangeOpt').classList.remove('selected');
  permKeepSelected = null;
  rebuildPermKeepGrid();
  Object.keys(permRanks).forEach(k => delete permRanks[k]);
  rebuildPermGrid();
  updateQR();
}

/* ──────────────────────────────────────────────
   Drag & drop PDF import
────────────────────────────────────────────── */
function fillFormFromData(data) {

  // Child info
  if (data.child) {
    document.getElementById('childLastName').value = data.child.lastName || '';
    document.getElementById('childFirstName').value = data.child.firstName || '';
    document.getElementById('childDate').value = data.child.date || '';
    updateChildDateLabel();
  }

  // Structure
  if (data.structure) {
    const r = document.querySelector(`input[name="structure"][value="${data.structure}"]`);
    if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
  }

  // Type
  if (data.typeAccueil) {
    const r = document.querySelector(`input[name="typeAccueil"][value="${data.typeAccueil}"]`);
    if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
  }

  // Days
  if (data.days) {
    data.days.forEach(d => {
      const key = (d.day || '').toLowerCase();
      if (!key) return;
      dayState[key] = {
        checked: d.selected,
        start: d.start ? timeToMins(d.start) || DEFAULT_START : DEFAULT_START,
        end: d.end ? timeToMins(d.end) || DEFAULT_END : DEFAULT_END,
      };
    });
    skipDayStateRead = true;
    rebuildDays();
  }

  // Vacation
  const vacEl = document.getElementById('vacScolaires');
  vacEl.checked = !!data.vacScolaires;
  document.getElementById('vacLabel').classList.toggle('selected', vacEl.checked);

  // Permanence
  if (data.permanence) {
    if (data.permanence.choice) {
      selectPerm(data.permanence.choice);
    }
    if (data.permanence.keep) {
      permKeepSelected = 'keep_' + data.permanence.keep;
      rebuildPermKeepGrid();
    }
    if (data.permanence.changeRanks) {
      Object.keys(permRanks).forEach(k => delete permRanks[k]);
      Object.entries(data.permanence.changeRanks).forEach(([id, rank]) => {
        permRanks['perm_' + id] = rank;
      });
      rebuildPermGrid();
    }
  }
  updateQR();
}

/* ──────────────────────────────────────────────
   Import from text code
────────────────────────────────────────────── */
function importFromCode() {
  const input = document.getElementById('codeInput');
  const code = input.value.trim();
  if (!code) return;
  try {
    const compact = decodeQRBinary(code);
    if (!compact) return;
    const data = expandCompactToObj(compact);
    fillFormFromData(data);
    input.value = '';
  } catch (err) {
    console.error('Code import error:', err);
  }
}

// Drop overlay
const overlay = document.getElementById('dropOverlay');
let dragCounter = 0;

document.addEventListener('dragenter', e => {
  e.preventDefault();
  dragCounter++;
  if (dragCounter === 1) overlay.classList.add('visible');
});

document.addEventListener('dragleave', e => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter <= 0) { dragCounter = 0; overlay.classList.remove('visible'); }
});

document.addEventListener('dragover', e => e.preventDefault());

document.addEventListener('drop', async e => {
  e.preventDefault();
  dragCounter = 0;
  overlay.classList.remove('visible');

  const file = e.dataTransfer.files[0];
  if (!file || file.type !== 'application/pdf') return;

  try {
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const meta = await pdf.getMetadata();
    const subject = meta.info && meta.info.Subject;
    if (!subject) return;
    const data = JSON.parse(subject);
    fillFormFromData(data);
  } catch (err) {
    console.error('PDF import failed:', err);
  }
});
