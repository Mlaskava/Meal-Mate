import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';
import { ImageCacheIt } from '@triniwiz/nativescript-image-cache-it';
import { Application } from '@nativescript/core';
import { Utils } from '@nativescript/core';

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule)
});

ImageCacheIt.enableAutoMM();

if (Application.android) {
  Application.on('launch', () => {
    const activity = Application.android.startActivity;

    if (Utils.android.getApplicationContext().getResources().getConfiguration().isNightModeActive()) {
      activity.setTheme(activity.getResources().getIdentifier('AppThemeDark', 'style', activity.getPackageName()));
    }
  });
}

