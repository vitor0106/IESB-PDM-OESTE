import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const position = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const parts = [address.street, address.district, address.city].filter(Boolean);
      if (parts.length) label = parts.join(', ');
    }
  } catch {
    // sem endereço: mantém as coordenadas
  }
  return { latitude, longitude, label };
}
