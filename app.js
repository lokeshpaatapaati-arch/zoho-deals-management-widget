
// STEP 1: Create sample Deal records

const deals = [
    {
        Deal_Name: "ABC Technologies",
        Amount: 50000,
        Stage: "Qualification",
        Closing_Date: "2026-12-15"
    },
    {
        Deal_Name: "XYZ Solutions",
        Amount: 75000,
        Stage: "Negotiation",
        Closing_Date: "2026-12-20"
    },
    {
        Deal_Name: "Global Services",
        Amount: 100000,
        Stage: "Closed Won",
        Closing_Date: "2026-11-30"
    },
    {
        Deal_Name: "Bright Future Ltd",
        Amount: 40000,
        Stage: "Closed Lost",
        Closing_Date: "2026-11-25"
    },
    {
        Deal_Name: "NextGen Systems",
        Amount: 90000,
        Stage: "Negotiation",
        Closing_Date: "2027-01-10"
    }
];


// STEP 2: Get HTML elements

const tableBody = document.getElementById("deal-table-body");

const searchInput = document.getElementById("deal-search");

const stageFilter = document.getElementById("stage-filter");


// STEP 3: Calculate dashboard summary

function updateSummary() {

    document.getElementById("total-deals").textContent =
        deals.length;

    document.getElementById("open-deals").textContent =
        deals.filter(function(deal) {
            return deal.Stage !== "Closed Won" &&
                   deal.Stage !== "Closed Lost";
        }).length;

    document.getElementById("closed-won").textContent =
        deals.filter(function(deal) {
            return deal.Stage === "Closed Won";
        }).length;

    document.getElementById("closed-lost").textContent =
        deals.filter(function(deal) {
            return deal.Stage === "Closed Lost";
        }).length;
}


// STEP 4: Display Deal records

function displayDeals(records) {

    tableBody.innerHTML = records.map(function(deal) {

        return `
            <tr>
                <td>${deal.Deal_Name}</td>
                <td>${new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
}).format(deal.Amount)}</td>
                <td>${deal.Stage}</td>
                <td>${deal.Closing_Date}</td>
            </tr>
        `;

    }).join("");

}


// STEP 5: Search and filter Deals

function filterDeals() {

    const searchValue = searchInput.value.toLowerCase();

    const selectedStage = stageFilter.value;

    const filteredDeals = deals.filter(function(deal) {

        const matchesName =
            deal.Deal_Name.toLowerCase().includes(searchValue);

        const matchesStage =
            selectedStage === "" || deal.Stage === selectedStage;

        return matchesName && matchesStage;

    });

    displayDeals(filteredDeals);
}


// STEP 6: Listen for user actions

searchInput.addEventListener("input", filterDeals);

stageFilter.addEventListener("change", filterDeals);


// STEP 7: Load dashboard

updateSummary();

displayDeals(deals);
  