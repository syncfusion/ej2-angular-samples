import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherPredictionComponent } from './weather-prediction.component';

export const AIMapsAppRoutes: Object[] = [
    { path: ':theme/ai-maps/weather-prediction', component: WeatherPredictionComponent, name: 'Weather Prediction', description: 'This demo showcases the Maps AI feature.', category: 'Maps' }
];

export const AIMapsSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIMapsAppRoutes);