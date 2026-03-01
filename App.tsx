/**
 * FitProject - iOS Camera Preview App
 *
 * Full-screen live camera preview using react-native-vision-camera.
 * Handles permission requests, denied state, and simulator fallback.
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
} from 'react-native-vision-camera';

type AppState =
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'restricted'
  | 'no-device';

export default function App(): React.JSX.Element {
  const [permissionStatus, setPermissionStatus] =
    useState<AppState>('requesting');

  // Use the back camera device
  const device = useCameraDevice('back');

  useEffect(() => {
    requestPermission();
  }, []);

  async function requestPermission(): Promise<void> {
    const current: CameraPermissionStatus =
      await Camera.getCameraPermissionStatus();

    if (current === 'granted') {
      setPermissionStatus('granted');
      return;
    }

    if (current === 'denied' || current === 'restricted') {
      setPermissionStatus(current);
      return;
    }

    // Status is 'not-determined' — ask the user
    const result: CameraPermissionStatus =
      await Camera.requestCameraPermission();

    if (result === 'granted') {
      setPermissionStatus('granted');
    } else if (result === 'restricted') {
      setPermissionStatus('restricted');
    } else {
      setPermissionStatus('denied');
    }
  }

  function openSettings(): void {
    Linking.openSettings();
  }

  // ── Requesting permission ─────────────────────────────────────────────────
  if (permissionStatus === 'requesting') {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.statusText}>Requesting Permission…</Text>
      </SafeAreaView>
    );
  }

  // ── Permission denied ─────────────────────────────────────────────────────
  if (permissionStatus === 'denied' || permissionStatus === 'restricted') {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.titleText}>Camera Access Required</Text>
        <Text style={styles.bodyText}>
          {permissionStatus === 'restricted'
            ? 'Camera access is restricted on this device.'
            : 'Camera permission was denied. Please enable it in Settings to use this app.'}
        </Text>
        {permissionStatus === 'denied' && (
          <TouchableOpacity style={styles.button} onPress={openSettings}>
            <Text style={styles.buttonText}>Open Settings</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }

  // ── No camera device (e.g. iOS Simulator without camera) ─────────────────
  if (!device) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.titleText}>No Camera Found</Text>
        <Text style={styles.bodyText}>
          {Platform.OS === 'ios'
            ? 'This device or simulator does not have a camera. Run on a physical iPhone to see the live preview.'
            : 'No camera device was found on this device.'}
        </Text>
      </SafeAreaView>
    );
  }

  // ── Live camera preview ───────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      {/* Status overlay */}
      <SafeAreaView style={styles.overlay} pointerEvents="none">
        <View style={styles.badge}>
          <Text style={styles.badgeText}>📷 Camera Ready</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  badge: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  statusText: {
    color: '#ccc',
    marginTop: 16,
    fontSize: 16,
  },
  titleText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  bodyText: {
    color: '#bbb',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0A84FF',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
