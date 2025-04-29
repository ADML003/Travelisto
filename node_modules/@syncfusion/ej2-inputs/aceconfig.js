//Config file for Accessibility-Checker
module.exports = {
    ruleArchive: "18March2024",
    policies: ["WCAG_2_1","IBM_Accessibility"],
    failLevels: ["violation", "potentialviolation"],
    reportLevels: [
        "violation",
        "potentialviolation",
        "recommendation",
        "potentialrecommendation",
        "manual",
        "pass",
    ],
    outputFormat: ["html","json"],
    label: [process.env.TRAVIS_BRANCH],
    outputFolder:"accessibility-reports",
  };