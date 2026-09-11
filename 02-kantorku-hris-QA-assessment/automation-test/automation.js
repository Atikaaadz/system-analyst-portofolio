require("dotenv").config();

const { chromium } = require("playwright");

// ============================================================
// CONFIG
// ============================================================

const BASE_URL = "https://example.com/";

const EMAIL = process.env.KANTORKU_EMAIL;
const PASSWORD = process.env.KANTORKU_PASSWORD;

// ============================================================
// DATA
// ============================================================

const positions = [
    "QA Engineer",
    "Software Engineer",
    "Product Manager",
    "UI UX Designer",
    "Business Analyst",
    "Data Analyst",
    "Project Manager",
    "HR Specialist",
    "Finance Staff",
    "Marketing Specialist",
];

const areas = Array.from(
    { length: 20 },
    (_, i) => `Automation Area ${String(i + 1).padStart(2, "0")}`
);

const subAreas = Array.from(
    { length: 20 },
    (_, i) =>
        `Automation Sub Area ${String(i + 1).padStart(2, "0")}`
);

// ============================================================
// VALIDATE ENV
// ============================================================

if (!EMAIL || !PASSWORD) {
    console.error("");
    console.error("========================================");
    console.error("ERROR: Credential tidak ditemukan");
    console.error("========================================");
    console.error("");
    console.error("Pastikan file .env berisi:");
    console.error("");
    console.error("KANTORKU_EMAIL=email_kamu");
    console.error("KANTORKU_PASSWORD=password_kamu");
    console.error("");

    process.exit(1);
}

// ============================================================
// MAIN
// ============================================================

(async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 200,
    });

    const context = await browser.newContext({
        viewport: {
            width: 1440,
            height: 900,
        },
    });

    const page = await context.newPage();

    try {
        // ====================================================
        // LOGIN
        // ====================================================

        console.log("");
        console.log("========================================");
        console.log("       KANTORKU AUTOMATION");
        console.log("========================================");
        console.log("");

        console.log("[1] Membuka KantorKu...");

        await page.goto(BASE_URL, {
            waitUntil: "domcontentloaded",
            timeout: 60000,
        });

        await page.waitForTimeout(2000);

        console.log("URL:", page.url());

        // ----------------------------------------------------
        // EMAIL
        // ----------------------------------------------------

        const emailInput = page
            .locator(
                'input[type="email"], input[name="email"], input[placeholder*="email" i]'
            )
            .first();

        await emailInput.waitFor({
            state: "visible",
            timeout: 15000,
        });

        await emailInput.fill(EMAIL);

        console.log("Email diisi.");

        // ----------------------------------------------------
        // PASSWORD
        // ----------------------------------------------------

        const passwordInput = page
            .locator(
                'input[type="password"], input[name="password"]'
            )
            .first();

        await passwordInput.waitFor({
            state: "visible",
            timeout: 15000,
        });

        await passwordInput.fill(PASSWORD);

        console.log("Password diisi.");

        // ----------------------------------------------------
        // LOGIN BUTTON
        // ----------------------------------------------------

        const loginButton = page
            .getByRole("button", {
                name: /login|log in|sign in|masuk/i,
            })
            .first();

        await loginButton.waitFor({
            state: "visible",
            timeout: 10000,
        });

        await loginButton.click();

        console.log("Login diklik.");

        await page.waitForTimeout(5000);

        try {
            await page.waitForLoadState("networkidle", {
                timeout: 15000,
            });
        } catch {
            // Tidak masalah jika networkidle timeout.
        }

        console.log("URL setelah login:", page.url());

        if (/login|signin|sign-in/i.test(page.url())) {
            throw new Error(
                "Login gagal. Periksa email/password pada .env."
            );
        }

        console.log("LOGIN BERHASIL.");

        // ====================================================
        // WAIT COMPANY UNIT PAGE
        // ====================================================

        console.log("");
        console.log("[2] Menunggu halaman Company Unit...");

        await page
            .getByText("Company Unit", {
                exact: true,
            })
            .first()
            .waitFor({
                state: "visible",
                timeout: 20000,
            });

        await page.waitForTimeout(2000);

        console.log("Company Unit ditemukan.");

        // ====================================================
        // HELPER: GET VISIBLE ELEMENT
        // ====================================================

        async function isVisible(locator) {
            return await locator
                .isVisible()
                .catch(() => false);
        }

        // ====================================================
        // HELPER: GET UNIT COLUMN
        // ====================================================

        async function getUnitColumn(unitName) {
            const headings = page.getByText(unitName, {
                exact: true,
            });

            const count = await headings.count();

            if (count === 0) {
                throw new Error(
                    `Judul "${unitName}" tidak ditemukan.`
                );
            }

            for (let i = 0; i < count; i++) {
                const heading = headings.nth(i);

                if (!(await isVisible(heading))) {
                    continue;
                }

                let element = heading;

                for (let level = 0; level < 8; level++) {
                    element = element.locator("..");

                    const box =
                        await element.boundingBox().catch(
                            () => null
                        );

                    if (!box) {
                        continue;
                    }

                    if (box.width < 200) {
                        continue;
                    }

                    const buttons =
                        element.locator("button");

                    const buttonCount =
                        await buttons.count();

                    if (buttonCount > 0) {
                        return element;
                    }
                }
            }

            throw new Error(
                `Container kolom "${unitName}" tidak ditemukan.`
            );
        }

        // ====================================================
        // HELPER: OPEN THREE DOT MENU
        // ====================================================

        async function openUnitMenu(unitName) {
            console.log(
                `Membuka menu "${unitName}"...`
            );

            const column =
                await getUnitColumn(unitName);

            const buttons =
                column.locator("button");

            const count =
                await buttons.count();

            /*
             * Header Position / Area / Sub Area
             * memiliki tombol ... di bagian kanan.
             *
             * Kita cari button yang paling kanan
             * pada bagian atas column.
             */

            const candidates = [];

            for (let i = 0; i < count; i++) {
                const button = buttons.nth(i);

                if (!(await isVisible(button))) {
                    continue;
                }

                const box =
                    await button.boundingBox().catch(
                        () => null
                    );

                if (!box) {
                    continue;
                }

                const text =
                    (
                        await button
                            .innerText()
                            .catch(() => "")
                    ).trim();

                const aria =
                    await button.getAttribute(
                        "aria-label"
                    );

                const title =
                    await button.getAttribute("title");

                const html =
                    await button
                        .evaluate((el) => el.outerHTML)
                        .catch(() => "");

                const looksLikeMenu =
                    text === "..." ||
                    text === "⋯" ||
                    /more|menu|option/i.test(
                        aria || ""
                    ) ||
                    /more|menu|option/i.test(
                        title || ""
                    ) ||
                    html.includes("ellipsis") ||
                    html.includes("more");

                if (looksLikeMenu) {
                    candidates.push({
                        button,
                        box,
                    });
                }
            }

            /*
             * Kalau icon tidak memiliki text/aria,
             * ambil button paling kanan yang berada
             * di bagian header.
             */

            if (candidates.length === 0) {
                const allButtons = [];

                for (let i = 0; i < count; i++) {
                    const button = buttons.nth(i);

                    if (!(await isVisible(button))) {
                        continue;
                    }

                    const box =
                        await button.boundingBox().catch(
                            () => null
                        );

                    if (!box) {
                        continue;
                    }

                    allButtons.push({
                        button,
                        box,
                    });
                }

                allButtons.sort(
                    (a, b) => b.box.x - a.box.x
                );

                if (allButtons.length > 0) {
                    candidates.push(
                        allButtons[0]
                    );
                }
            }

            if (candidates.length === 0) {
                throw new Error(
                    `Tombol menu "${unitName}" tidak ditemukan.`
                );
            }

            candidates.sort(
                (a, b) => b.box.x - a.box.x
            );

            const target =
                candidates[0];

            console.log(
                `      Tombol menu "${unitName}" ditemukan.`
            );

            await target.button.click();

            await page.waitForTimeout(500);
        }

        // ====================================================
        // HELPER: CLICK ADD FROM MENU
        // ====================================================

        async function clickAddFromMenu() {
            console.log("      Mencari Add...");

            const addCandidates = [
                page.getByText("Add", {
                    exact: true,
                }),
                page.getByRole("button", {
                    name: /^Add$/i,
                }),
            ];

            for (const candidate of addCandidates) {
                const count =
                    await candidate.count();

                for (let i = count - 1; i >= 0; i--) {
                    const item = candidate.nth(i);

                    if (await isVisible(item)) {
                        await item.click();

                        await page.waitForTimeout(500);

                        console.log(
                            "      Add diklik."
                        );

                        return;
                    }
                }
            }

            throw new Error(
                "Menu Add tidak ditemukan."
            );
        }

        // ====================================================
        // HELPER: FIND MODAL
        // ====================================================

        async function getVisibleModal() {
            const dialogs =
                page.getByRole("dialog");

            const dialogCount =
                await dialogs.count();

            for (let i = dialogCount - 1; i >= 0; i--) {
                const dialog = dialogs.nth(i);

                if (await isVisible(dialog)) {
                    return dialog;
                }
            }

            return null;
        }

        // ====================================================
        // HELPER: FILL NAME INPUT
        // ====================================================

        async function fillName(value) {
            const dialog =
                await getVisibleModal();

            let input;

            if (dialog) {
                const inputs =
                    dialog.locator("input");

                const count =
                    await inputs.count();

                for (let i = 0; i < count; i++) {
                    const candidate =
                        inputs.nth(i);

                    if (await isVisible(candidate)) {
                        input = candidate;
                        break;
                    }
                }
            }

            if (!input) {
                const inputs =
                    page.locator("input:visible");

                const count =
                    await inputs.count();

                if (count > 0) {
                    input = inputs.last();
                }
            }

            if (!input) {
                throw new Error(
                    `Input untuk "${value}" tidak ditemukan.`
                );
            }

            await input.fill(value);

            console.log(
                `      Input: ${value}`
            );
        }

        // ====================================================
        // HELPER: SAVE
        // ====================================================

        async function saveModal() {
            const dialog =
                await getVisibleModal();

            let saveButton = null;

            if (dialog) {
                const buttons =
                    dialog.getByRole("button");

                const count =
                    await buttons.count();

                for (
                    let i = count - 1;
                    i >= 0;
                    i--
                ) {
                    const button =
                        buttons.nth(i);

                    if (!(await isVisible(button))) {
                        continue;
                    }

                    const text =
                        (
                            await button
                                .innerText()
                                .catch(() => "")
                        ).trim();

                    if (/save|simpan/i.test(text)) {
                        saveButton = button;
                        break;
                    }
                }
            }

            if (!saveButton) {
                const candidates =
                    page.getByRole("button", {
                        name: /save|simpan/i,
                    });

                const count =
                    await candidates.count();

                for (
                    let i = count - 1;
                    i >= 0;
                    i--
                ) {
                    const button =
                        candidates.nth(i);

                    if (await isVisible(button)) {
                        saveButton = button;
                        break;
                    }
                }
            }

            if (!saveButton) {
                throw new Error(
                    "Tombol Save tidak ditemukan."
                );
            }

            await saveButton.click();

            await page.waitForTimeout(1200);

            console.log(
                "      Save berhasil."
            );
        }

        // ====================================================
        // HELPER:
        // CLICK COMPANY UNIT +
        // ====================================================

        async function clickCompanyUnitPlus() {
            console.log(
                '      Mencari tombol "+" Company Unit...'
            );

            const heading =
                page.getByText("Company Unit", {
                    exact: true,
                }).first();

            await heading.waitFor({
                state: "visible",
                timeout: 10000,
            });

            const headingBox =
                await heading.boundingBox();

            if (!headingBox) {
                throw new Error(
                    'Posisi "Company Unit" tidak ditemukan.'
                );
            }

            /*
             * Screenshot:
             *
             * Company Unit                         [+]
             *
             * Jadi kita cari semua button yang:
             *
             * 1. visible
             * 2. berada di kanan heading
             * 3. berada sejajar dengan heading
             * 4. ukuran relatif kecil
             */

            const buttons =
                page.locator("button:visible");

            const count =
                await buttons.count();

            const candidates = [];

            const headingCenterY =
                headingBox.y +
                headingBox.height / 2;

            for (let i = 0; i < count; i++) {
                const button =
                    buttons.nth(i);

                const box =
                    await button.boundingBox()
                        .catch(() => null);

                if (!box) {
                    continue;
                }

                const buttonCenterY =
                    box.y +
                    box.height / 2;

                const verticalDistance =
                    Math.abs(
                        buttonCenterY -
                        headingCenterY
                    );

                const rightSide =
                    box.x >
                    headingBox.x +
                    headingBox.width +
                    200;

                const sameRow =
                    verticalDistance < 80;

                const reasonableSize =
                    box.width >= 20 &&
                    box.width <= 100 &&
                    box.height >= 20 &&
                    box.height <= 100;

                if (
                    rightSide &&
                    sameRow &&
                    reasonableSize
                ) {
                    candidates.push({
                        button,
                        box,
                    });
                }
            }

            /*
             * Ambil kandidat yang paling kanan.
             */

            candidates.sort(
                (a, b) => b.box.x - a.box.x
            );

            if (candidates.length > 0) {
                const target =
                    candidates[0];

                console.log(
                    "      Tombol + ditemukan:",
                    target.box
                );

                await target.button.click();

                await page.waitForTimeout(700);

                return;
            }

            /*
             * FALLBACK:
             *
             * Cari button yang memiliki SVG.
             * Kemudian pilih yang berada paling kanan
             * dan dekat dengan heading Company Unit.
             */

            const svgButtons =
                page.locator(
                    'button:visible:has(svg)'
                );

            const svgCount =
                await svgButtons.count();

            const svgCandidates = [];

            for (let i = 0; i < svgCount; i++) {
                const button =
                    svgButtons.nth(i);

                const box =
                    await button.boundingBox()
                        .catch(() => null);

                if (!box) {
                    continue;
                }

                const buttonCenterY =
                    box.y +
                    box.height / 2;

                const verticalDistance =
                    Math.abs(
                        buttonCenterY -
                        headingCenterY
                    );

                if (
                    box.x >
                        headingBox.x +
                        headingBox.width +
                        200 &&
                    verticalDistance < 100
                ) {
                    svgCandidates.push({
                        button,
                        box,
                    });
                }
            }

            svgCandidates.sort(
                (a, b) => b.box.x - a.box.x
            );

            if (svgCandidates.length > 0) {
                const target =
                    svgCandidates[0];

                console.log(
                    "      Tombol + ditemukan melalui SVG:",
                    target.box
                );

                await target.button.click();

                await page.waitForTimeout(700);

                return;
            }

            /*
             * DEBUG INFORMATION
             */

            console.log("");
            console.log(
                "      DEBUG: Button visible:"
            );

            for (let i = 0; i < count; i++) {
                const button =
                    buttons.nth(i);

                const box =
                    await button.boundingBox()
                        .catch(() => null);

                if (!box) {
                    continue;
                }

                console.log(
                    `      button[${i}]`,
                    box
                );
            }

            throw new Error(
                'Tombol "+" Company Unit tidak ditemukan.'
            );
        }

        // ====================================================
        // POSITION
        // ====================================================

        console.log("");
        console.log("========================================");
        console.log("ADDING 10 POSITIONS");
        console.log("========================================");

        for (
            let i = 0;
            i < positions.length;
            i++
        ) {
            const position =
                positions[i];

            console.log("");
            console.log(
                `[${i + 1}/10] ${position}`
            );

            await openUnitMenu("Position");

            await clickAddFromMenu();

            await fillName(position);

            await saveModal();
        }

        console.log("");
        console.log("10 POSITION SELESAI.");

        // ====================================================
        // CREATE AREA
        // ====================================================

        console.log("");
        console.log("========================================");
        console.log("CREATE COMPANY UNIT: AREA");
        console.log("========================================");

        await clickCompanyUnitPlus();

        await fillName("Area");

        await saveModal();

        await page.waitForTimeout(1500);

        console.log(
            'Company Unit "Area" berhasil dibuat.'
        );

        // ====================================================
        // ADD 20 AREA
        // ====================================================

        console.log("");
        console.log("========================================");
        console.log("ADDING 20 AREAS");
        console.log("========================================");

        for (
            let i = 0;
            i < areas.length;
            i++
        ) {
            const area =
                areas[i];

            console.log("");
            console.log(
                `[${i + 1}/20] ${area}`
            );

            await openUnitMenu("Area");

            await clickAddFromMenu();

            await fillName(area);

            await saveModal();
        }

        console.log("");
        console.log("20 AREA SELESAI.");

        // ====================================================
        // CREATE SUB AREA
        // ====================================================

        console.log("");
        console.log("========================================");
        console.log("CREATE COMPANY UNIT: SUB AREA");
        console.log("========================================");

        await clickCompanyUnitPlus();

        await fillName("Sub Area");

        await saveModal();

        await page.waitForTimeout(1500);

        console.log(
            'Company Unit "Sub Area" berhasil dibuat.'
        );

        // ====================================================
        // ADD 20 SUB AREA
        // ====================================================

        console.log("");
        console.log("========================================");
        console.log("ADDING 20 SUB AREAS");
        console.log("========================================");

        for (
            let i = 0;
            i < subAreas.length;
            i++
        ) {
            const subArea =
                subAreas[i];

            console.log("");
            console.log(
                `[${i + 1}/20] ${subArea}`
            );

            await openUnitMenu("Sub Area");

            await clickAddFromMenu();

            await fillName(subArea);

            await saveModal();
        }

        // ====================================================
        // FINISH
        // ====================================================

        await page.screenshot({
            path: "automation-finished.png",
            fullPage: true,
        });

        console.log("");
        console.log("========================================");
        console.log("        AUTOMATION SELESAI");
        console.log("========================================");
        console.log("");
        console.log("Position : 10");
        console.log("Area     : 20");
        console.log("Sub Area : 20");
        console.log("TOTAL    : 50 DATA");
        console.log("");
        console.log(
            "Data hasil automation silakan dihapus MANUAL."
        );
        console.log("");
        console.log(
            "Screenshot: automation-finished.png"
        );
        console.log("");

        await page.waitForTimeout(5000);

    } catch (error) {
        console.error("");
        console.error("========================================");
        console.error("          AUTOMATION ERROR");
        console.error("========================================");
        console.error("");
        console.error(error);
        console.error("");

        await page
            .screenshot({
                path: "automation-error.png",
                fullPage: true,
            })
            .catch(() => {});

        console.error(
            "Screenshot: automation-error.png"
        );

        process.exitCode = 1;

    } finally {
        await browser.close();
    }
})();