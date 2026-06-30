# Moja Summer Camp Enrollment Strategy

This document outlines the enrollment strategy for the Moja Behavioral Services Summer Camp, detailing the pathways for three distinct camper populations.

## Overview

The summer camp serves three main groups:
1.  **Existing Moja Clients:** Children currently receiving ABA services at Moja.
2.  **Self-Pay Community Campers:** Neurodiverse children in the community who do not require clinical ABA services during camp.
3.  **Potential/New Clients:** Children who need ABA services and wish to attend the camp as part of their intake or ongoing care.

To ensure a smooth experience for families and an organized intake process for the clinic, we will use a tailored enrollment pathway for each group.

## Enrollment Pathways

### Pathway 1: Existing Moja Clients
*   **Goal:** Ensure current families officially sign up and reserve their spot, confirming their schedule and any specific camp accommodations.
*   **Process:** A simplified, direct enrollment form. Since Moja already has their clinical and demographic data, this form focuses purely on camp logistics (dates, t-shirt size, emergency contact confirmation, consent for camp activities).
*   **Tone:** Warm, familiar, and celebratory ("We're so excited to have your child join us for camp!").

### Pathway 2: Self-Pay Community Campers
*   **Goal:** Qualify and enroll children from the community who do not need 1:1 ABA support but will benefit from a neurodiversity-affirming camp environment.
*   **Process:** A comprehensive registration form that includes basic demographic info, medical history, behavioral profile (to ensure the camp is a safe fit without 1:1 support), liability waivers, and payment processing for the self-pay tuition.
*   **Tone:** Welcoming, clear, and reassuring ("Moja Kids is a place where every child belongs.").

### Pathway 3: Potential/New Clients (Needing ABA Services)
*   **Goal:** Guide families who need clinical services through the standard intake process, while capturing their interest in the summer camp.
*   **Process:** Since Moja already uses ABA Engine for clinical intake, this pathway should leverage that existing system. We will create a landing page or an initial "Camp Interest" form that seamlessly directs these families to the ABA Engine intake workflow, perhaps adding a specific tag or note that they are interested in the summer camp program.
*   **Tone:** Supportive, professional, and mission-driven ("Our team is here for your family as we explore both camp and ongoing support.").

## System Architecture

We will build a centralized "Camp Hub" landing page that acts as the front door for all interested families. 

1.  **The Hub:** A welcoming page explaining the camp, dates, and activities. It will feature a clear "Which path is right for you?" section to route families correctly.
2.  **Form 1 (Existing Clients):** Hosted directly on the hub or linked securely.
3.  **Form 2 (Community Campers):** Hosted directly on the hub with integrated payment or clear payment instructions.
4.  **Form 3 (New Clients):** A brief pre-screener that explains the requirement for an intake assessment and links out to the ABA Engine portal.

## Next Steps for Development

1.  Initialize a web project to build the Camp Hub and the custom forms (Forms 1 & 2).
2.  Apply Moja brand guidelines (Quicksand font, Blue/Aqua/Pink palette, 35% opacity blob accents) to ensure a warm, family-forward interface.
3.  Design the routing logic so families easily self-select their appropriate pathway.
