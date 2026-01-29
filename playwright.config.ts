import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['playwright-smart-reporter', {
            outputFile: 'smart-report.html',
            historyFile: 'test-history.json',
            maxHistoryRuns: 10,
            enableRetryAnalysis: true,
            enableFailureClustering: true,
            enableStabilityScore: true,
            enableGalleryView: true,
            enableComparison: true,
            enableAIRecommendations: true,
            enableTraceViewer: true,
            enableHistoryDrilldown: true,
            enableNetworkLogs: true,
        }],
        ['html']
    ],
    use: {
        baseURL: 'https://www.demoblaze.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
