// Transit data types and static data for the frontend

export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface Route {
  id: string;
  name: string;
  type: 'metro' | 'bus' | 'train' | 'tram';
}

export interface Stop {
  id: string;
  name: string;
}

// Static city data
export const CITIES: City[] = [
  { id: 'delhi', name: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { id: 'bangalore', name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
  { id: 'chennai', name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { id: 'hyderabad', name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
  { id: 'kolkata', name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
];

// Route data by city - using city-prefixed IDs to avoid duplicates
export const ROUTES_BY_CITY: Record<string, Route[]> = {
  delhi: [
    { id: 'delhi-yellow-line', name: 'Yellow Line (Metro)', type: 'metro' },
    { id: 'delhi-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'delhi-red-line', name: 'Red Line (Metro)', type: 'metro' },
    { id: 'delhi-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'delhi-violet-line', name: 'Violet Line (Metro)', type: 'metro' },
    { id: 'delhi-dtc-522', name: 'DTC Route 522', type: 'bus' },
    { id: 'delhi-dtc-764', name: 'DTC Route 764', type: 'bus' },
  ],
  mumbai: [
    { id: 'mumbai-western-line', name: 'Western Line (Local)', type: 'train' },
    { id: 'mumbai-central-line', name: 'Central Line (Local)', type: 'train' },
    { id: 'mumbai-harbour-line', name: 'Harbour Line (Local)', type: 'train' },
    { id: 'mumbai-metro-1', name: 'Metro Line 1 (Blue)', type: 'metro' },
    { id: 'mumbai-best-1', name: 'BEST Route 1', type: 'bus' },
    { id: 'mumbai-best-83', name: 'BEST Route 83', type: 'bus' },
  ],
  bangalore: [
    { id: 'bangalore-purple-line', name: 'Purple Line (Metro)', type: 'metro' },
    { id: 'bangalore-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'bangalore-bmtc-500', name: 'BMTC Route 500', type: 'bus' },
    { id: 'bangalore-bmtc-335e', name: 'BMTC Route 335E', type: 'bus' },
  ],
  chennai: [
    { id: 'chennai-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'chennai-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'chennai-mrts', name: 'MRTS (Beach-Velachery)', type: 'train' },
    { id: 'chennai-mtc-5c', name: 'MTC Route 5C', type: 'bus' },
  ],
  hyderabad: [
    { id: 'hyderabad-red-line', name: 'Red Line (Metro)', type: 'metro' },
    { id: 'hyderabad-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'hyderabad-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'hyderabad-tsrtc-5k', name: 'TSRTC Route 5K', type: 'bus' },
  ],
  kolkata: [
    { id: 'kolkata-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'kolkata-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'kolkata-circular-rail', name: 'Circular Rail', type: 'train' },
    { id: 'kolkata-tram-5', name: 'Tram Route 5', type: 'tram' },
  ],
};

// Stops by route - using city-prefixed route IDs
export const STOPS_BY_ROUTE: Record<string, Stop[]> = {
  // Delhi Yellow Line
  'delhi-yellow-line': [
    { id: 'samaypur-badli', name: 'Samaypur Badli' },
    { id: 'azadpur', name: 'Azadpur' },
    { id: 'kashmere-gate', name: 'Kashmere Gate' },
    { id: 'chandni-chowk', name: 'Chandni Chowk' },
    { id: 'new-delhi', name: 'New Delhi' },
    { id: 'rajiv-chowk', name: 'Rajiv Chowk' },
    { id: 'central-secretariat', name: 'Central Secretariat' },
    { id: 'hauz-khas', name: 'Hauz Khas' },
    { id: 'qutub-minar', name: 'Qutub Minar' },
    { id: 'huda-city-centre', name: 'HUDA City Centre' },
  ],
  'delhi-blue-line': [
    { id: 'dwarka-sec-21', name: 'Dwarka Sector 21' },
    { id: 'janakpuri-west', name: 'Janakpuri West' },
    { id: 'rajouri-garden', name: 'Rajouri Garden' },
    { id: 'karol-bagh', name: 'Karol Bagh' },
    { id: 'rajiv-chowk', name: 'Rajiv Chowk' },
    { id: 'mandi-house', name: 'Mandi House' },
    { id: 'yamuna-bank', name: 'Yamuna Bank' },
    { id: 'noida-city-centre', name: 'Noida City Centre' },
  ],
  'delhi-red-line': [
    { id: 'rithala', name: 'Rithala' },
    { id: 'netaji-subhash-place', name: 'Netaji Subhash Place' },
    { id: 'kashmere-gate', name: 'Kashmere Gate' },
    { id: 'welcome', name: 'Welcome' },
    { id: 'dilshad-garden', name: 'Dilshad Garden' },
  ],
  'delhi-green-line': [
    { id: 'inderlok', name: 'Inderlok' },
    { id: 'punjabi-bagh', name: 'Punjabi Bagh' },
    { id: 'kirti-nagar', name: 'Kirti Nagar' },
    { id: 'mundka', name: 'Mundka' },
  ],
  'delhi-violet-line': [
    { id: 'kashmere-gate', name: 'Kashmere Gate' },
    { id: 'jama-masjid', name: 'Jama Masjid' },
    { id: 'central-secretariat', name: 'Central Secretariat' },
    { id: 'nehru-place', name: 'Nehru Place' },
    { id: 'botanical-garden', name: 'Botanical Garden' },
  ],
  'delhi-dtc-522': [
    { id: 'isbt-kashmere', name: 'ISBT Kashmere Gate' },
    { id: 'delhi-gate', name: 'Delhi Gate' },
    { id: 'nehru-place-bus', name: 'Nehru Place' },
    { id: 'badarpur', name: 'Badarpur Border' },
  ],
  'delhi-dtc-764': [
    { id: 'uttam-nagar', name: 'Uttam Nagar Terminal' },
    { id: 'connaught-place', name: 'Connaught Place' },
    { id: 'ito', name: 'ITO' },
  ],
  // Mumbai
  'mumbai-western-line': [
    { id: 'churchgate', name: 'Churchgate' },
    { id: 'mumbai-central', name: 'Mumbai Central' },
    { id: 'dadar', name: 'Dadar' },
    { id: 'bandra', name: 'Bandra' },
    { id: 'andheri', name: 'Andheri' },
    { id: 'borivali', name: 'Borivali' },
  ],
  'mumbai-central-line': [
    { id: 'csmt', name: 'CSMT' },
    { id: 'dadar-central', name: 'Dadar' },
    { id: 'kurla', name: 'Kurla' },
    { id: 'ghatkopar', name: 'Ghatkopar' },
    { id: 'thane', name: 'Thane' },
  ],
  'mumbai-harbour-line': [
    { id: 'csmt-harbour', name: 'CSMT' },
    { id: 'chembur', name: 'Chembur' },
    { id: 'vashi', name: 'Vashi' },
    { id: 'panvel', name: 'Panvel' },
  ],
  'mumbai-metro-1': [
    { id: 'versova', name: 'Versova' },
    { id: 'andheri-metro', name: 'Andheri' },
    { id: 'ghatkopar-metro', name: 'Ghatkopar' },
  ],
  'mumbai-best-1': [
    { id: 'colaba-bus', name: 'Colaba' },
    { id: 'flora-fountain', name: 'Flora Fountain' },
    { id: 'csmt-best', name: 'CSMT' },
  ],
  'mumbai-best-83': [
    { id: 'bandra-bus', name: 'Bandra' },
    { id: 'kurla-bus', name: 'Kurla' },
  ],
  // Bangalore
  'bangalore-purple-line': [
    { id: 'whitefield', name: 'Whitefield' },
    { id: 'indiranagar', name: 'Indiranagar' },
    { id: 'mg-road-blr', name: 'MG Road' },
    { id: 'majestic', name: 'Majestic (Kempegowda)' },
    { id: 'mysuru-road', name: 'Mysuru Road' },
  ],
  'bangalore-green-line': [
    { id: 'nagasandra', name: 'Nagasandra' },
    { id: 'yeshwanthpur', name: 'Yeshwanthpur' },
    { id: 'majestic-green', name: 'Majestic (Kempegowda)' },
    { id: 'jayanagar', name: 'Jayanagar' },
  ],
  'bangalore-bmtc-500': [
    { id: 'majestic-bus', name: 'Majestic' },
    { id: 'electronic-city', name: 'Electronic City' },
  ],
  'bangalore-bmtc-335e': [
    { id: 'whitefield-bus', name: 'Whitefield' },
    { id: 'majestic-335', name: 'Majestic' },
  ],
  // Chennai
  'chennai-blue-line': [
    { id: 'wimco-nagar', name: 'Wimco Nagar' },
    { id: 'central-chn', name: 'Central' },
    { id: 'saidapet', name: 'Saidapet' },
    { id: 'airport', name: 'Chennai Airport' },
  ],
  'chennai-green-line': [
    { id: 'central-green', name: 'Central' },
    { id: 'thousand-lights', name: 'Thousand Lights' },
    { id: 'st-thomas-mount', name: 'St. Thomas Mount' },
  ],
  'chennai-mrts': [
    { id: 'beach', name: 'Beach' },
    { id: 'thiruvanmiyur', name: 'Thiruvanmiyur' },
    { id: 'velachery', name: 'Velachery' },
  ],
  'chennai-mtc-5c': [
    { id: 'broadway-bus', name: 'Broadway' },
    { id: 't-nagar', name: 'T. Nagar' },
  ],
  // Hyderabad
  'hyderabad-red-line': [
    { id: 'miyapur', name: 'Miyapur' },
    { id: 'hitech-city', name: 'Hitech City' },
    { id: 'ameerpet', name: 'Ameerpet' },
    { id: 'lb-nagar', name: 'LB Nagar' },
  ],
  'hyderabad-blue-line': [
    { id: 'raidurg', name: 'Raidurg' },
    { id: 'ameerpet-blue', name: 'Ameerpet' },
    { id: 'secunderabad', name: 'Secunderabad' },
  ],
  'hyderabad-green-line': [
    { id: 'jbs', name: 'JBS Parade Ground' },
    { id: 'paradise', name: 'Paradise' },
    { id: 'mgbs', name: 'MGBS' },
  ],
  'hyderabad-tsrtc-5k': [
    { id: 'secunderabad-bus', name: 'Secunderabad' },
    { id: 'charminar', name: 'Charminar' },
  ],
  // Kolkata
  'kolkata-blue-line': [
    { id: 'dakshineswar', name: 'Dakshineswar' },
    { id: 'dum-dum', name: 'Dum Dum' },
    { id: 'park-street', name: 'Park Street' },
    { id: 'esplanade', name: 'Esplanade' },
    { id: 'kavi-subhas', name: 'Kavi Subhash' },
  ],
  'kolkata-green-line': [
    { id: 'salt-lake', name: 'Salt Lake Sector V' },
    { id: 'sealdah', name: 'Sealdah' },
    { id: 'howrah-maidan', name: 'Howrah Maidan' },
  ],
  'kolkata-circular-rail': [
    { id: 'ballygunge', name: 'Ballygunge Junction' },
    { id: 'dum-dum-jn', name: 'Dum Dum Junction' },
  ],
  'kolkata-tram-5': [
    { id: 'shyambazar', name: 'Shyambazar' },
    { id: 'esplanade-tram', name: 'Esplanade' },
  ],
};

// Get route icon based on type
export function getRouteIcon(type: Route['type']): string {
  switch (type) {
    case 'metro': return '🚇';
    case 'bus': return '🚌';
    case 'train': return '🚆';
    case 'tram': return '🚊';
    default: return '🚌';
  }
}
