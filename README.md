# Fiche de Voeux -- Petit Nemo 2026-2027

Interactive web form for **Petit Nemo**, a French parent-run childcare facility (*creche parentale*). Parents fill in their care preferences for the upcoming year and download a pre-filled PDF.

## Pages

### `fiche-voeux.html` -- Parent form

The main form parents use. Collects:

| Section | Fields |
|---|---|
| **Child** | Last name, first name, single date field (auto-detects birth vs expected based on past/future) |
| **Facility** | Petit Nemo / Baby Nemo / No preference |
| **Care type** | Regular or Occasional |
| **Days** | Mon--Fri checkboxes with dual-handle time sliders (7h30--18h00, arrival before 9h00, departure after 16h00) |
| **Holidays only** | Optional checkbox |
| **Duty shifts** | Keep current slot (single-select grid) or change (ranked multi-select, 1=preferred) |

Features:
- **FR/EN** language toggle
- **PDF generation** (jsPDF) -- print-friendly light header, all notes/footer included for hand-filling
- **QR code + text import code** embedded in the PDF and shown live on the page
- **Drag-and-drop** a previously generated PDF to refill the form
- **Text code import** -- paste an `N1...` code to refill
- **Clear** button (bottom-right corner, for testing)

### `admin.html` -- Admin dashboard

Batch import tool for collecting responses:
- **Drop multiple PDFs** to extract data into a spreadsheet table
- **Paste a text code** (`N1...`) to import manually
- **Scan QR code** via device camera (requires HTTPS)
- **Copy as TSV** (paste into Excel/Sheets) or **CSV**

## Data formats

### PDF metadata (expanded JSON)

Stored in the PDF's `Subject` property. Human-readable, used for PDF drag-and-drop import.

```json
{
  "child": { "lastName": "Martin", "firstName": "Lea", "date": "2025-03-15", "dateType": "birth" },
  "structure": "petit_nemo",
  "typeAccueil": "regulier",
  "days": [
    { "day": "lundi", "selected": true, "start": "8h30", "end": "17h00" },
    { "day": "mardi", "selected": false, "start": null, "end": null }
  ],
  "vacScolaires": false,
  "permanence": { "choice": "keep", "keep": "lundi_matin", "changeRanks": {} }
}
```

Extracting:
```bash
# Python
import pikepdf, json
data = json.loads(str(pikepdf.open('file.pdf').docinfo['/Subject']))

# CLI
pdfinfo file.pdf | grep Subject
```

### QR code / import code (compact binary)

Used for QR codes and text import codes. Prefix `N1` + base64-encoded binary.

**Binary layout (schema v1):**

| Byte(s) | Content |
|---|---|
| 0 | Flags: bits 0-1 structure (0=none,1=p,2=b,3=i), 2 type (0=regulier,1=occasionnel), 3 vac, 4 hasPerm, 5 permVal (0=keep,1=change), 6 dateType (0=birth,1=expected), 7 reserved |
| 1 | Day bits: bit0=lundi .. bit4=vendredi |
| 2-3 | Date as uint16 big-endian (days since 2020-01-01; 0xFFFF = no date) |
| 4..n | 2 length-prefixed UTF-8 strings: lastName, firstName |
| then | Per selected day: 2 bytes (start offset/15, end offset/15) from 450min base |
| then | Perm data: keep=1 byte slot index; change=count + (slotIndex,rank) pairs |

Slot order (10 slots): lundi_matin, mardi_matin, ..., vendredi_matin, lundi_AM, ..., vendredi_AM.

Typical payload: 15--40 bytes encoded, vs ~400+ chars of JSON.

## PDF output

- **Print-friendly**: light blue header (no dark fill that wastes ink)
- **Parity**: all notes, footer text, and group info from the HTML are reproduced on the PDF so it works as a standalone hand-fillable form
- **Filename**: `Fiche_Voeux_PetitNemo_{year}_{LastName}_{YYYY-MM-DD}.pdf`
- **QR code**: lower-right corner, contains compact binary data
- **Import code**: printed as text next to the QR for manual entry

## Configuration

All year-specific dates live in `config.json`:

```json
{
  "year": "2026-2027",
  "careStart": "2026-08-26",
  "deadline": "2026-02-23",
  "responseBy": "2026-03-30"
}
```

Dates are ISO 8601 strings, formatted at runtime using `Intl.DateTimeFormat` for both FR and EN (with weekday, e.g. "lundi 23 fevrier 2026" / "Monday, February 23, 2026"). To roll over to a new year, edit this single file.

## Architecture

Static frontend, no backend, no build step. All dependencies vendored locally in `vendor/`.

A Cloudflare Worker (TypeScript) backend could be added later for submission collection, but frontend-only is preferred.

## File structure

```
config.json                   Year-specific dates (single source of truth)
fiche-voeux.html              Parent form (markup)
fiche-voeux.css               Styles (includes self-hosted @font-face)
fiche-voeux.js                i18n, UI logic, PDF generation, QR live preview
nemo-codec.js                 Shared binary QR codec (encode/decode/expand)
admin.html                    Admin dashboard (uses shared codec)
vendor/
  jspdf.umd.min.js            jsPDF 2.5.1 -- PDF generation
  pdf.min.js                  pdf.js 3.11.174 -- PDF metadata reading
  pdf.worker.min.js           pdf.js worker
  qrious.min.js               QRious 4.0.2 -- QR code generation
  qr-scanner.umd.min.js       qr-scanner 1.4.2 -- camera QR scanning (admin)
  fonts/
    inter-{400,500,600,700}.woff2   Inter font (Google Fonts, self-hosted)
PN - Fiche de Voeux 2026-2027.pdf   Original reference PDF
```

## Vendored dependencies

| Library | Version | License | Purpose |
|---|---|---|---|
| [jsPDF](https://github.com/parallax/jsPDF) | 2.5.1 | MIT | Client-side PDF generation |
| [pdf.js](https://github.com/nicosResworking/pdf.js) | 3.11.174 | Apache 2.0 | Reading PDF metadata on import |
| [QRious](https://github.com/neocotic/qrious) | 4.0.2 | GPL-3.0 | QR code generation (canvas) |
| [qr-scanner](https://github.com/nimiq/qr-scanner) | 1.4.2 | MIT | Camera-based QR scanning |
| [Inter](https://github.com/rsms/inter) | variable | OFL 1.1 | UI font (woff2, weights 400-700) |

## Changing the year

Edit `config.json` with the new dates. Everything else (HTML, PDF, filenames) updates automatically.
