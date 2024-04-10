import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';
import { ImageCacheIt } from "@triniwiz/nativescript-image-cache-it";

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

ImageCacheIt.enableAutoMM();

