package com.beneficiodiario.afin;

import static org.junit.Assert.*;

import android.content.Context;
import android.os.ParcelFileDescriptor;
import android.os.SystemClock;
import android.webkit.WebView;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.view.accessibility.AccessibilityNodeInfo;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import androidx.test.espresso.Espresso;
import java.io.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;

/** Runs the packaged production web assets in a real Android WebView with fictitious answers. */
@RunWith(AndroidJUnit4.class)
public class OfflineJourneyTest {
    private String evaluate(ActivityScenario<MainActivity> scenario, String script) throws Exception {
        AtomicReference<String> result = new AtomicReference<>();
        CountDownLatch done = new CountDownLatch(1);
        scenario.onActivity(activity -> activity.getBridge().getWebView().evaluateJavascript(script, value -> {
            result.set(value);
            done.countDown();
        }));
        assertTrue("WebView did not respond", done.await(15, TimeUnit.SECONDS));
        return result.get();
    }

    private void waitFor(ActivityScenario<MainActivity> scenario, String condition) throws Exception {
        long deadline = SystemClock.uptimeMillis() + 30000;
        while (SystemClock.uptimeMillis() < deadline) {
            if ("true".equals(evaluate(scenario, "Boolean(" + condition + ")"))) return;
            SystemClock.sleep(200);
        }
        fail("Condition not reached: " + condition);
    }

    private void screenshot(ActivityScenario<MainActivity> scenario, String name) throws Exception {
        CountDownLatch painted = new CountDownLatch(1);
        scenario.onActivity(activity -> {
            WebView web = activity.getBridge().getWebView();
            web.postVisualStateCallback(SystemClock.uptimeMillis(), new WebView.VisualStateCallback() {
                @Override public void onComplete(long requestId) {
                    web.invalidate();
                    painted.countDown();
                }
            });
        });
        assertTrue("WebView did not commit a visual frame", painted.await(15, TimeUnit.SECONDS));
        InstrumentationRegistry.getInstrumentation().waitForIdleSync();
        SystemClock.sleep(2000);
        Bitmap image = InstrumentationRegistry.getInstrumentation().getUiAutomation().takeScreenshot();
        assertNotNull("No screenshot available", image);
        int contentPixels = 0;
        for (int y = image.getHeight() / 4; y < image.getHeight() * 3 / 4; y += 4) {
            for (int x = 40; x < image.getWidth() - 40; x += 4) {
                int pixel = image.getPixel(x, y);
                if (Math.abs(Color.red(pixel)-252) + Math.abs(Color.green(pixel)-253) + Math.abs(Color.blue(pixel)-249) > 120) contentPixels++;
            }
        }
        image.recycle();
        assertTrue("The app must visibly paint content, not a blank surface", contentPixels > 200);
        // The shell capture runs only inside this isolated test emulator. No personal data is used.
        ParcelFileDescriptor command = InstrumentationRegistry.getInstrumentation().getUiAutomation()
            .executeShellCommand("screencap -p /sdcard/Download/afin-" + name + ".png");
        try (InputStream stream = new ParcelFileDescriptor.AutoCloseInputStream(command)) {
            byte[] buffer = new byte[1024];
            while (stream.read(buffer) != -1) { /* Wait for screencap to complete. */ }
        }
    }

    private boolean appIsForeground() {
        AccessibilityNodeInfo root = InstrumentationRegistry.getInstrumentation().getUiAutomation().getRootInActiveWindow();
        return root != null && "com.beneficiodiario.afin".equals(String.valueOf(root.getPackageName()));
    }

    private void closeShareSheet() throws Exception {
        long deadline = SystemClock.uptimeMillis() + 15000;
        while (appIsForeground() && SystemClock.uptimeMillis() < deadline) SystemClock.sleep(200);
        assertFalse("The native share sheet must open", appIsForeground());
        for (int attempt = 0; attempt < 3 && !appIsForeground(); attempt++) {
            SystemClock.sleep(1000);
            ParcelFileDescriptor command = InstrumentationRegistry.getInstrumentation().getUiAutomation().executeShellCommand("input keyevent 4");
            try (InputStream stream = new ParcelFileDescriptor.AutoCloseInputStream(command)) {
                byte[] buffer = new byte[128];
                while (stream.read(buffer) != -1) { }
            }
            SystemClock.sleep(1000);
        }
        assertTrue("Share sheet did not close", appIsForeground());
    }

    @Test
    public void packagedQuestionnaireBackExportPrivacyAndScreenshots() throws Exception {
        Context context = InstrumentationRegistry.getInstrumentation().getTargetContext();
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> assertNull("No native action bar may obscure the web header", activity.getSupportActionBar()));
            waitFor(scenario, "document.readyState === 'complete' && document.querySelector('.hero-copy h1') && document.querySelector('.hero-art img').complete");
            waitFor(scenario, "document.querySelector('.hero-copy h1').getBoundingClientRect().height > 0 && document.querySelector('.hero-copy h1').getBoundingClientRect().top < innerHeight");
            assertEquals("true", evaluate(scenario, "document.documentElement.classList.contains('native-app')"));
            screenshot(scenario, "01-inicio");
            evaluate(scenario, "document.querySelector('a[href=\"/test\"]').click()");
            waitFor(scenario, "location.pathname === '/test' && document.querySelector('.answer-option')");
            String firstHeading = evaluate(scenario, "document.querySelector('h1').textContent.trim()");
            evaluate(scenario, "document.querySelector('.answer-option input[value=\"-2\"]').click()");
            waitFor(scenario, "!document.querySelector('.quiz-actions .button-dark').disabled");
            screenshot(scenario, "02-pregunta");
            evaluate(scenario, "document.querySelector('.quiz-actions .button-dark').click()");
            waitFor(scenario, "document.querySelector('h1').textContent.trim() !== " + firstHeading);
            Espresso.pressBack();
            waitFor(scenario, "document.querySelector('h1').textContent.trim() === " + firstHeading);
            assertEquals("true", evaluate(scenario, "document.querySelector('.answer-option input[value=\"-2\"]').checked"));

            for (int i = 0; i < 34; i++) {
                String previousHeading = evaluate(scenario, "document.querySelector('h1').textContent.trim()");
                int value = i % 5 - 2;
                evaluate(scenario, "document.querySelector('.answer-option input[value=\"" + value + "\"]').click()");
                waitFor(scenario, "!document.querySelector('.quiz-actions .button-dark').disabled");
                evaluate(scenario, "document.querySelector('.quiz-actions .button-dark').click()");
                waitFor(scenario, i == 33 ? "location.pathname === '/resultados'" :
                    "document.querySelector('h1').textContent.trim() !== " + previousHeading);
            }
            waitFor(scenario, "document.querySelector('.result-hero')");
            evaluate(scenario, "window.scrollTo(0, document.querySelector('.result-hero').getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').getBoundingClientRect().height - 24)");
            screenshot(scenario, "03-resultados-ejemplo");
            assertEquals("true", evaluate(scenario, "localStorage.length === 0 && sessionStorage.length === 0 && document.cookie === ''"));
            evaluate(scenario, "[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Guardar mis datos')).click()");
            File exports = new File(context.getCacheDir(), "afin-exports");
            long deadline = SystemClock.uptimeMillis() + 15000;
            File[] files = exports.listFiles();
            while ((files == null || files.length == 0) && SystemClock.uptimeMillis() < deadline) {
                SystemClock.sleep(200);
                files = exports.listFiles();
            }
            assertNotNull("Export folder missing", files);
            assertEquals("One current private export expected", 1, files.length);
            StringBuilder text = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(files[0]), "UTF-8"))) {
                String line;
                while ((line = reader.readLine()) != null) text.append(line);
            }
            assertEquals(34, new JSONObject(text.toString()).getJSONObject("answers").length());
            closeShareSheet();
            evaluate(scenario, "document.querySelector('a[href=\"/programas\"]').click()");
            waitFor(scenario, "location.pathname === '/programas' && document.querySelector('.program-card')");
            evaluate(scenario, "window.scrollTo(0, document.querySelector('.program-filters').getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').getBoundingClientRect().height - 24)");
            screenshot(scenario, "04-fuentes");
            evaluate(scenario, "document.querySelector('a[href=\"/privacidad\"]').click()");
            waitFor(scenario, "location.pathname === '/privacidad' && document.body.textContent.includes('caché privada')");
            assertEquals("true", evaluate(scenario, "document.body.textContent.includes('info@beneficiodiario.com')"));
        }
    }
}
