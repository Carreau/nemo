# Fiche de Voeux - Petit Nemo 2026-2027

Interactive web form for **Petit Nemo**, a French parent-run childcare facility (*creche parentale*), that replaces the static PDF enrollment preference sheet with a fillable HTML application.

Parents fill in their care preferences for the upcoming school year, then download a pre-filled PDF that mirrors the original paper form.

## What the form collects

| Section | Fields |
|---|---|
| **Child info** | Last name, first name, date (auto-detects birth vs expected based on whether the date is past or future) |
| **Facility preference** | Petit Nemo / Baby Nemo / No preference |
| **Care type** | Regular (*regulier*) or Occasional (*occasionnel*) |
| **Care days** | Monday-Friday checkboxes, each with a dual-handle time range slider (7h30-18h00, with enforced arrival before 9h00 and departure after 16h00) |
| **School holidays only** | Optional checkbox |
| **Duty shifts (permanences)** | Keep current slot (single selection grid) or change with ranked preference grid (1 = most preferred, 10 = least preferred) |

## Features

- **Bilingual (FR/EN)** -- language toggle in the banner, all labels and PDF output switch accordingly
- **Smart date field** -- single date input; label auto-switches between "Ne(e) le" and "Naissance prevue le" based on whether the date is past or future relative to today
- **Time range sliders** -- dual-thumb range inputs per day with visual fill bar, constrained arrival/departure windows, and limit badges
- **Permanence grids** -- "keep" uses a single-select grid (pick one slot), "change" uses a ranked multi-select grid (click to assign preference order 1, 2, 3...)
- **PDF generation** -- client-side via [jsPDF](https://github.com/parallax/jsPDF), print-friendly (light background, no heavy ink fills)
- **Embedded JSON data** -- form data is stored as JSON in the PDF metadata for programmatic extraction (see below)
- **Responsive** -- adapts to mobile screens
- **Zero backend** -- no build step, no server required

## Important: PDF parity

The generated PDF must contain **all the same information visible on the HTML page** (headers, notes, footer text, group info, etc.) -- not just the filled-in fields. Some parents will print the PDF and fill it in by hand, so it needs to work as a standalone paper form.

## PDF filename

The downloaded PDF is named `Fiche_Voeux_PetitNemo_2026-2027_{LastName}_{YYYY-MM-DD}.pdf`, including the child's last name and the download date for easy identification.

## Embedded JSON data

All form data is embedded in the PDF's `Subject` metadata field as a JSON string. This allows programmatic extraction without OCR or parsing the visual layout.

### Extracting the data

```bash
# Python (pikepdf)
import pikepdf, json
pdf = pikepdf.open('Fiche_Voeux_PetitNemo_2026-2027_Martin_2026-04-13.pdf')
data = json.loads(str(pdf.docinfo['/Subject']))

# CLI (poppler-utils)
pdfinfo file.pdf | grep Subject
```

### Compact JSON schema (v1)

The data is stored as a positional array to minimize size:

```json
[1,["Martin","Lea","2025-03-15","b"],"p","r",[["8h30","17h00"],null,null,["9h00","16h30"],null],0,["c",{"lundi_matin":1,"mardi_AM":2}]]
```

Format: `[version, child, structure, type, days, vac, permanence]`

| Index | Field | Format |
|---|---|---|
| `0` | Schema version | Always `1` |
| `1` | Child | `[lastName, firstName, date, dateType]` -- dateType: `"b"`=birth, `"e"`=expected, `null` |
| `2` | Structure | `"p"`=Petit Nemo, `"b"`=Baby Nemo, `"i"`=indifferent, `null` |
| `3` | Type | `"r"`=regulier, `"o"`=occasionnel, `null` |
| `4` | Days | Array of 5 (Mon-Fri): `null` if not selected, or `["8h30","17h00"]` |
| `5` | Vac. scolaires | `1` or `0` |
| `6` | Permanence | `null`, `["k","lundi_matin"]` (keep), or `["c",{slot:rank,...}]` (change) |

Period suffixes in slot IDs: `_matin` = morning (9h-12h30), `_AM` = afternoon (14h30-18h).

Both the form (drag-to-refill) and admin page auto-detect and decode this format.

## Architecture

Currently a static frontend with no backend. A **Cloudflare Worker (TypeScript)** backend could be added later (e.g. to collect submissions, send confirmation emails), but frontend-only is preferred to keep things simple.

## Usage

Open `fiche-voeux.html` in any modern browser. Fill in the form and click **Telecharger le PDF pre-rempli** at the bottom.

## Tech stack

- HTML + external CSS and JavaScript (no inline styles/scripts beyond layout)
- [jsPDF 2.5.1](https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js) loaded from CDN
- [Inter](https://fonts.google.com/specimen/Inter) font from Google Fonts
- No frameworks, no build tools, no dependencies beyond the two CDN resources above

## File structure

```
fiche-voeux.html                    # HTML structure (form markup)
fiche-voeux.css                     # All styles
fiche-voeux.js                      # i18n, UI logic, PDF generation
admin.html                          # Admin page: batch PDF import → spreadsheet view
PN - Fiche de Voeux 2026-2027.pdf   # Original reference PDF form
```

## Key dates (2026-2027 school year)

- **Deadline** to return the form: February 23, 2026
- **Care starts**: August 26, 2026
- **Response** from the facility: by March 30, 2026
- Wednesday after-school requests reviewed by early June
