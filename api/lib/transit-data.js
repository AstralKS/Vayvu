// Indian city coordinates for weather API
const CITY_COORDINATES = {
  delhi: { lat: 28.6139, lon: 77.2090, name: 'Delhi' },
  mumbai: { lat: 19.0760, lon: 72.8777, name: 'Mumbai' },
  bangalore: { lat: 12.9716, lon: 77.5946, name: 'Bangalore' },
  chennai: { lat: 13.0827, lon: 80.2707, name: 'Chennai' },
  hyderabad: { lat: 17.3850, lon: 78.4867, name: 'Hyderabad' },
  kolkata: { lat: 22.5726, lon: 88.3639, name: 'Kolkata' }
};

// Transit routes for each city - using city-prefixed IDs to avoid duplicates
const CITY_ROUTES = {
  delhi: [
    { id: 'delhi-yellow-line', name: 'Yellow Line (Metro)', type: 'metro' },
    { id: 'delhi-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'delhi-red-line', name: 'Red Line (Metro)', type: 'metro' },
    { id: 'delhi-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'delhi-violet-line', name: 'Violet Line (Metro)', type: 'metro' },
    { id: 'delhi-dtc-522', name: 'DTC Route 522', type: 'bus' },
    { id: 'delhi-dtc-764', name: 'DTC Route 764', type: 'bus' }
  ],
  mumbai: [
    { id: 'mumbai-western-line', name: 'Western Line (Local)', type: 'train' },
    { id: 'mumbai-central-line', name: 'Central Line (Local)', type: 'train' },
    { id: 'mumbai-harbour-line', name: 'Harbour Line (Local)', type: 'train' },
    { id: 'mumbai-metro-1', name: 'Metro Line 1 (Blue)', type: 'metro' },
    { id: 'mumbai-best-1', name: 'BEST Route 1', type: 'bus' },
    { id: 'mumbai-best-83', name: 'BEST Route 83', type: 'bus' }
  ],
  bangalore: [
    { id: 'bangalore-purple-line', name: 'Purple Line (Metro)', type: 'metro' },
    { id: 'bangalore-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'bangalore-bmtc-500', name: 'BMTC Route 500', type: 'bus' },
    { id: 'bangalore-bmtc-335e', name: 'BMTC Route 335E', type: 'bus' }
  ],
  chennai: [
    { id: 'chennai-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'chennai-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'chennai-mrts', name: 'MRTS (Beach-Velachery)', type: 'train' },
    { id: 'chennai-mtc-5c', name: 'MTC Route 5C', type: 'bus' }
  ],
  hyderabad: [
    { id: 'hyderabad-red-line', name: 'Red Line (Metro)', type: 'metro' },
    { id: 'hyderabad-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'hyderabad-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'hyderabad-tsrtc-5k', name: 'TSRTC Route 5K', type: 'bus' }
  ],
  kolkata: [
    { id: 'kolkata-blue-line', name: 'Blue Line (Metro)', type: 'metro' },
    { id: 'kolkata-green-line', name: 'Green Line (Metro)', type: 'metro' },
    { id: 'kolkata-circular-rail', name: 'Circular Rail', type: 'train' },
    { id: 'kolkata-tram-5', name: 'Tram Route 5', type: 'tram' }
  ]
};

// Stops for each route - using city-prefixed route IDs
const ROUTE_STOPS = {
  // Delhi Yellow Line
  'delhi-yellow-line': [
    { id: 'samaypur-badli', name: 'Samaypur Badli' },
    { id: 'rohini-sector-18', name: 'Rohini Sector 18-19' },
    { id: 'haiderpur', name: 'Haiderpur Badli Mor' },
    { id: 'jahangirpuri', name: 'Jahangirpuri' },
    { id: 'adarsh-nagar', name: 'Adarsh Nagar' },
    { id: 'azadpur', name: 'Azadpur' },
    { id: 'gtb-nagar', name: 'GTB Nagar' },
    { id: 'vishwavidyalaya', name: 'Vishwavidyalaya' },
    { id: 'vidhan-sabha', name: 'Vidhan Sabha' },
    { id: 'civil-lines', name: 'Civil Lines' },
    { id: 'kashmere-gate', name: 'Kashmere Gate' },
    { id: 'chandni-chowk', name: 'Chandni Chowk' },
    { id: 'chawri-bazar', name: 'Chawri Bazar' },
    { id: 'new-delhi', name: 'New Delhi' },
    { id: 'rajiv-chowk', name: 'Rajiv Chowk' },
    { id: 'patel-chowk', name: 'Patel Chowk' },
    { id: 'central-secretariat', name: 'Central Secretariat' },
    { id: 'udyog-bhawan', name: 'Udyog Bhawan' },
    { id: 'lok-kalyan-marg', name: 'Lok Kalyan Marg' },
    { id: 'ina', name: 'INA' },
    { id: 'aiims', name: 'AIIMS' },
    { id: 'green-park', name: 'Green Park' },
    { id: 'hauz-khas', name: 'Hauz Khas' },
    { id: 'malviya-nagar', name: 'Malviya Nagar' },
    { id: 'saket', name: 'Saket' },
    { id: 'qutub-minar', name: 'Qutub Minar' },
    { id: 'chattarpur', name: 'Chattarpur' },
    { id: 'sultanpur', name: 'Sultanpur' },
    { id: 'ghitorni', name: 'Ghitorni' },
    { id: 'arjangarh', name: 'Arjangarh' },
    { id: 'guru-dronacharya', name: 'Guru Dronacharya' },
    { id: 'sikandarpur', name: 'Sikandarpur' },
    { id: 'mg-road', name: 'MG Road' },
    { id: 'iffco-chowk', name: 'IFFCO Chowk' },
    { id: 'huda-city-centre', name: 'HUDA City Centre' }
  ],
  // Delhi Blue Line
  'delhi-blue-line': [
    { id: 'dwarka-sec-21', name: 'Dwarka Sector 21' },
    { id: 'dwarka-sec-8', name: 'Dwarka Sector 8' },
    { id: 'dwarka', name: 'Dwarka' },
    { id: 'janakpuri-west', name: 'Janakpuri West' },
    { id: 'rajouri-garden', name: 'Rajouri Garden' },
    { id: 'karol-bagh', name: 'Karol Bagh' },
    { id: 'rajiv-chowk', name: 'Rajiv Chowk' },
    { id: 'barakhamba', name: 'Barakhamba Road' },
    { id: 'mandi-house', name: 'Mandi House' },
    { id: 'pragati-maidan', name: 'Pragati Maidan' },
    { id: 'yamuna-bank', name: 'Yamuna Bank' },
    { id: 'noida-city-centre', name: 'Noida City Centre' },
    { id: 'noida-electronic-city', name: 'Noida Electronic City' }
  ],
  'delhi-red-line': [
    { id: 'rithala', name: 'Rithala' },
    { id: 'netaji-subhash-place', name: 'Netaji Subhash Place' },
    { id: 'pitampura', name: 'Pitampura' },
    { id: 'kashmere-gate', name: 'Kashmere Gate' },
    { id: 'tis-hazari', name: 'Tis Hazari' },
    { id: 'welcome', name: 'Welcome' },
    { id: 'dilshad-garden', name: 'Dilshad Garden' }
  ],
  'delhi-green-line': [
    { id: 'inderlok', name: 'Inderlok' },
    { id: 'ashok-park', name: 'Ashok Park Main' },
    { id: 'punjabi-bagh', name: 'Punjabi Bagh' },
    { id: 'kirti-nagar', name: 'Kirti Nagar' },
    { id: 'mundka', name: 'Mundka' }
  ],
  'delhi-violet-line': [
    { id: 'kashmere-gate', name: 'Kashmere Gate' },
    { id: 'lal-quila', name: 'Lal Quila' },
    { id: 'jama-masjid', name: 'Jama Masjid' },
    { id: 'central-secretariat', name: 'Central Secretariat' },
    { id: 'nehru-place', name: 'Nehru Place' },
    { id: 'kalkaji-mandir', name: 'Kalkaji Mandir' },
    { id: 'botanical-garden', name: 'Botanical Garden' }
  ],
  'delhi-dtc-522': [
    { id: 'isbt-kashmere', name: 'ISBT Kashmere Gate' },
    { id: 'delhi-gate', name: 'Delhi Gate' },
    { id: 'ashram', name: 'Ashram' },
    { id: 'nehru-place-bus', name: 'Nehru Place' },
    { id: 'badarpur', name: 'Badarpur Border' }
  ],
  'delhi-dtc-764': [
    { id: 'uttam-nagar', name: 'Uttam Nagar Terminal' },
    { id: 'tilak-nagar', name: 'Tilak Nagar' },
    { id: 'connaught-place', name: 'Connaught Place' },
    { id: 'ito', name: 'ITO' }
  ],
  // Mumbai Western Line
  'mumbai-western-line': [
    { id: 'churchgate', name: 'Churchgate' },
    { id: 'marine-lines', name: 'Marine Lines' },
    { id: 'charni-road', name: 'Charni Road' },
    { id: 'mumbai-central', name: 'Mumbai Central' },
    { id: 'dadar', name: 'Dadar' },
    { id: 'bandra', name: 'Bandra' },
    { id: 'andheri', name: 'Andheri' },
    { id: 'borivali', name: 'Borivali' },
    { id: 'virar', name: 'Virar' }
  ],
  'mumbai-central-line': [
    { id: 'csmt', name: 'CSMT' },
    { id: 'masjid', name: 'Masjid Bunder' },
    { id: 'byculla', name: 'Byculla' },
    { id: 'dadar-central', name: 'Dadar' },
    { id: 'kurla', name: 'Kurla' },
    { id: 'ghatkopar', name: 'Ghatkopar' },
    { id: 'thane', name: 'Thane' },
    { id: 'kalyan', name: 'Kalyan' }
  ],
  'mumbai-harbour-line': [
    { id: 'csmt-harbour', name: 'CSMT' },
    { id: 'wadala', name: 'Wadala Road' },
    { id: 'chembur', name: 'Chembur' },
    { id: 'vashi', name: 'Vashi' },
    { id: 'nerul', name: 'Nerul' },
    { id: 'panvel', name: 'Panvel' }
  ],
  'mumbai-metro-1': [
    { id: 'versova', name: 'Versova' },
    { id: 'andheri-metro', name: 'Andheri' },
    { id: 'wea', name: 'Western Express Highway' },
    { id: 'chakala', name: 'Chakala' },
    { id: 'ghatkopar-metro', name: 'Ghatkopar' }
  ],
  'mumbai-best-1': [
    { id: 'colaba-bus', name: 'Colaba Bus Station' },
    { id: 'flora-fountain', name: 'Flora Fountain' },
    { id: 'csmt-best', name: 'CSMT' },
    { id: 'byculla-best', name: 'Byculla' }
  ],
  'mumbai-best-83': [
    { id: 'bandra-bus', name: 'Bandra Bus Depot' },
    { id: 'kurla-bus', name: 'Kurla' },
    { id: 'andheri-bus', name: 'Andheri' }
  ],
  // Bangalore
  'bangalore-purple-line': [
    { id: 'whitefield', name: 'Whitefield' },
    { id: 'kadugodi', name: 'Kadugodi' },
    { id: 'indiranagar', name: 'Indiranagar' },
    { id: 'mg-road-blr', name: 'MG Road' },
    { id: 'majestic', name: 'Majestic (Kempegowda)' },
    { id: 'vijayanagar', name: 'Vijayanagar' },
    { id: 'mysuru-road', name: 'Mysuru Road' },
    { id: 'kengeri', name: 'Kengeri' }
  ],
  'bangalore-green-line': [
    { id: 'nagasandra', name: 'Nagasandra' },
    { id: 'yeshwanthpur', name: 'Yeshwanthpur' },
    { id: 'majestic-green', name: 'Majestic (Kempegowda)' },
    { id: 'chickpete', name: 'Chickpete' },
    { id: 'jayanagar', name: 'Jayanagar' },
    { id: 'yelachenahalli', name: 'Yelachenahalli' },
    { id: 'silk-institute', name: 'Silk Institute' }
  ],
  'bangalore-bmtc-500': [
    { id: 'majestic-bus', name: 'Majestic Bus Station' },
    { id: 'shivajinagar', name: 'Shivajinagar' },
    { id: 'electronic-city', name: 'Electronic City' }
  ],
  'bangalore-bmtc-335e': [
    { id: 'whitefield-bus', name: 'Whitefield' },
    { id: 'kr-puram', name: 'KR Puram' },
    { id: 'majestic-335', name: 'Majestic' }
  ],
  // Chennai
  'chennai-blue-line': [
    { id: 'wimco-nagar', name: 'Wimco Nagar' },
    { id: 'broadway', name: 'Broadway' },
    { id: 'central-chn', name: 'Central' },
    { id: 'egmore', name: 'Egmore' },
    { id: 'nandanam', name: 'Nandanam' },
    { id: 'saidapet', name: 'Saidapet' },
    { id: 'airport', name: 'Chennai Airport' }
  ],
  'chennai-green-line': [
    { id: 'central-green', name: 'Central' },
    { id: 'mannadi', name: 'Mannadi' },
    { id: 'high-court', name: 'High Court' },
    { id: 'thousand-lights', name: 'Thousand Lights' },
    { id: 'mg-road-chn', name: 'MG Road' },
    { id: 'st-thomas-mount', name: 'St. Thomas Mount' }
  ],
  'chennai-mrts': [
    { id: 'beach', name: 'Beach' },
    { id: 'fort', name: 'Fort' },
    { id: 'thiruvanmiyur', name: 'Thiruvanmiyur' },
    { id: 'velachery', name: 'Velachery' }
  ],
  'chennai-mtc-5c': [
    { id: 'broadway-bus', name: 'Broadway' },
    { id: 't-nagar', name: 'T. Nagar' },
    { id: 'tambaram', name: 'Tambaram' }
  ],
  // Hyderabad
  'hyderabad-red-line': [
    { id: 'miyapur', name: 'Miyapur' },
    { id: 'hitech-city', name: 'Hitech City' },
    { id: 'madhapur', name: 'Madhapur' },
    { id: 'ameerpet', name: 'Ameerpet' },
    { id: 'lb-nagar', name: 'LB Nagar' }
  ],
  'hyderabad-blue-line': [
    { id: 'raidurg', name: 'Raidurg' },
    { id: 'hitec-city-blue', name: 'Hitech City' },
    { id: 'ameerpet-blue', name: 'Ameerpet' },
    { id: 'secunderabad', name: 'Secunderabad' }
  ],
  'hyderabad-green-line': [
    { id: 'jbs', name: 'JBS Parade Ground' },
    { id: 'paradise', name: 'Paradise' },
    { id: 'ameerpet-green', name: 'Ameerpet' },
    { id: 'mgbs', name: 'MGBS' }
  ],
  'hyderabad-tsrtc-5k': [
    { id: 'secunderabad-bus', name: 'Secunderabad' },
    { id: 'abids', name: 'Abids' },
    { id: 'charminar', name: 'Charminar' }
  ],
  // Kolkata
  'kolkata-blue-line': [
    { id: 'dakshineswar', name: 'Dakshineswar' },
    { id: 'noapara', name: 'Noapara' },
    { id: 'dum-dum', name: 'Dum Dum' },
    { id: 'park-street', name: 'Park Street' },
    { id: 'esplanade', name: 'Esplanade' },
    { id: 'kalighat', name: 'Kalighat' },
    { id: 'kavi-subhas', name: 'Kavi Subhash' }
  ],
  'kolkata-green-line': [
    { id: 'salt-lake', name: 'Salt Lake Sector V' },
    { id: 'central-park', name: 'Central Park' },
    { id: 'sealdah', name: 'Sealdah' },
    { id: 'esplanade-green', name: 'Esplanade' },
    { id: 'howrah-maidan', name: 'Howrah Maidan' }
  ],
  'kolkata-circular-rail': [
    { id: 'princep', name: 'Princep Ghat' },
    { id: 'ballygunge', name: 'Ballygunge Junction' },
    { id: 'dum-dum-jn', name: 'Dum Dum Junction' }
  ],
  'kolkata-tram-5': [
    { id: 'shyambazar', name: 'Shyambazar' },
    { id: 'college-street', name: 'College Street' },
    { id: 'esplanade-tram', name: 'Esplanade' }
  ]
};

module.exports = { CITY_COORDINATES, CITY_ROUTES, ROUTE_STOPS };
