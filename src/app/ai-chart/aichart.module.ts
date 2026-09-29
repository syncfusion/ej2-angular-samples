import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DataPreprocessingComponent } from './data-preprocessing';
import { GenerateChartComponent } from './chart-assist';
import { StockForecastingComponent } from './stock-forecasting';

export const AIChartAppRoutes: Object[] = [
    { path: ':theme/ai-chart/chart-assist', component: GenerateChartComponent, name: 'Chart Assist', description: 'This demo shows how to generate charts using AI assistance and render them inside AI AssistView responses.', category: 'Chart', type: 'New', 'order': '13', sourceFiles: [
        {displayName: 'chart-assist.ts', path: './src/app/ai-chart/chart-assist.ts'},
        {displayName: 'chart-assist.html', path: './src/app/ai-chart/chart-assist.html'},
        {displayName: 'chart-assist.css', path: './src/app/ai-chart/chart-assist.css'},
        {displayName: 'model/ai-input.ts', path: './src/app/ai-chart/chart-assist/model/ai-input.ts'},
        {displayName: 'model/chart-api.ts', path: './src/app/ai-chart/chart-assist/model/chart-api.ts'},
        {displayName: 'model/sf-ai-schema.ts', path: './src/app/ai-chart/chart-assist/model/sf-ai-schema.ts'},
        {displayName: 'model/prompt-data.ts', path: './src/app/ai-chart/chart-assist/model/prompt-data.ts'}
    ] },
    { path: ':theme/ai-chart/data-preprocessing', component: DataPreprocessingComponent, name: 'Data Preprocessing', description: 'This demo for the AI-powered data cleaning and preprocessing for tracking hourly website visitor data.', category: 'Chart', type: 'New', 'order': '13', sourceFiles: [ 
        {displayName: 'data-preprocessing.ts', path: './src/app/ai-chart/data-preprocessing.ts'},
        {displayName: 'data-preprocessing.html', path: './src/app/ai-chart/data-preprocessing.html'}
    ] },
    { path: ':theme/ai-chart/stock-forecasting', component: StockForecastingComponent, name: 'Stock Forecasting', description: 'This demo shows how to create AI-powered stock forecasting charts.', category: 'Chart', type: 'New', 'order': '13', sourceFiles: [ 
        {displayName: 'stock-forecasting.ts', path: './src/app/ai-chart/stock-forecasting.ts'},
        {displayName: 'stock-forecasting.html', path: './src/app/ai-chart/stock-forecasting.html'}
    ] },
]
export const AIChartSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIChartAppRoutes);