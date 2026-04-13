# Fiche de Voeux - Petit Nemo 2026-2027

Interactive web form for **Petit Nemo**, a French parent-run childcare facility (*creche parentale*), that replaces the static PDF enrollment preference sheet with a fillable HTML application.

Parents fill in their care preferences for the upcoming school year, then download a pre-filled PDF that mirrors the original paper form.

## What the form collects

| Section | Fields |
|---|---|
| **Child info** | Last name, first name, date of birth, expected birth date |
| **Facility preference** | Petit Nemo / Baby Nemo / No preference |
| **Care type** | Regular (*regulier*) or Occasional (*occasionnel*) |
| **Care days** | Monday-Friday checkboxes, each with a dual-handle time range slider (7h30-18h00, with enforced arrival before 9h00 and departure after 16h00) |
| **School holidays only** | Optional checkbox |
| **Duty shifts (permanences)** | Keep current day+period, or change with ranked preference grid (morning/afternoon x 5 days) |

## Features

- **Bilingual (FR/EN)** -- language toggle in the banner, all labels and PDF output switch accordingly
- **Time range sliders** -- dual-thumb range inputs per day with visual fill bar, constrained arrival/departure windows, and limit badges
- **Ranked permanence selection** -- click day/period buttons to assign preference order (1, 2, 3...), click again to remove and auto-reorder
- **PDF generation** -- client-side via [jsPDF](https://github.com/parallax/jsPDF), produces an A4 document matching the layout of the original `PN - Fiche de Voeux 2026-2027.pdf`
- **Responsive** -- adapts to mobile screens
- **Zero backend** -- no build step, no server required

## Important: PDF parity

The generated PDF must contain **all the same information visible on the HTML page** (headers, notes, footer text, group info, etc.) -- not just the filled-in fields. Some parents will print the PDF and fill it in by hand, so it needs to work as a standalone paper form.

## PDF filename

The downloaded PDF is named `Fiche_Voeux_PetitNemo_2026-2027_{LastName}_{YYYY-MM-DD}.pdf`, including the child's last name and the download date for easy identification.

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
PN - Fiche de Voeux 2026-2027.pdf   # Original reference PDF form
```

## Key dates (2026-2027 school year)

- **Deadline** to return the form: February 23, 2026
- **Care starts**: August 26, 2026
- **Response** from the facility: by March 30, 2026
- Wednesday after-school requests reviewed by early June
