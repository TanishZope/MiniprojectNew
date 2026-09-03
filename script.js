// ============================================================
// DATA STRUCTURES
// ============================================================

// Queue - FIFO (First In First Out)
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(el) {
        this.items.push(el);
        return this;
    }
    
    dequeue() {
        return this.isEmpty() ? null : this.items.shift();
    }
    
    front() {
        return this.isEmpty() ? null : this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    display() {
        return [...this.items];
    }
    
    clear() {
        this.items = [];
    }
}

// Priority Queue - Higher priority first
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority = 0) {
        const queueElement = { element, priority };
        let added = false;
        
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority > this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        
        if (!added) {
            this.items.push(queueElement);
        }
        
        return this;
    }
    
    dequeue() {
        return this.isEmpty() ? null : this.items.shift().element;
    }
    
    front() {
        return this.isEmpty() ? null : this.items[0].element;
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    display() {
        return this.items.map(item => ({ ...item.element, _priority: item.priority }));
    }
    
    clear() {
        this.items = [];
    }
}

// Linked List Node
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Linked List
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    append(data) {
        const node = new ListNode(data);
        
        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        
        this.size++;
        return this;
    }
    
    find(callback) {
        let current = this.head;
        while (current) {
            if (callback(current.data)) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }
    
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
    
    update(callback, newData) {
        let current = this.head;
        while (current) {
            if (callback(current.data)) {
                current.data = { ...current.data, ...newData };
                return true;
            }
            current = current.next;
        }
        return false;
    }
}

// ============================================================
// GLOBAL STATE
// ============================================================
let allFlights = [];
let allPassengers = [];
let passengerCounter = 1;
let regularQueue = new Queue();
let priorityQueue = new PriorityQueue();
let flightStatusList = new LinkedList();
let currentFilter = 'all';
let currentSort = 'departure';
let searchPerformed = false;
let lastSearchedFrom = '';
let lastSearchedTo = '';
let currentResults = [];
let flightIdCounter = 1;
let stopCounter = 0;

// ============================================================
// COMPLETE CITY LIST
// ============================================================
const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata',
    'Pune', 'Ahmedabad', 'Goa', 'Kochi', 'Thiruvananthapuram', 'Jaipur',
    'Lucknow', 'Guwahati', 'Patna', 'Bhubaneswar', 'Vadodara', 'Nagpur',
    'Indore', 'Amritsar', 'Chandigarh', 'Surat', 'Raipur', 'Ranchi',
    'Dehradun', 'Vijayawada', 'Visakhapatnam', 'Mangalore', 'Calicut',
    'Singapore', 'Dubai', 'London', 'New York', 'Tokyo', 'Paris',
    'Frankfurt', 'Amsterdam', 'Rome', 'Madrid', 'Barcelona', 'Istanbul',
    'Moscow', 'Beijing', 'Shanghai', 'Hong Kong', 'Bangkok', 'Kuala Lumpur',
    'Jakarta', 'Manila', 'Sydney', 'Melbourne', 'Auckland', 'Toronto',
    'Vancouver', 'Chicago', 'Los Angeles', 'San Francisco', 'Miami',
    'Dallas', 'Atlanta', 'Denver', 'Seattle', 'Boston', 'Washington',
    'Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca', 'Lagos',
    'Doha', 'Abu Dhabi', 'Riyadh', 'Muscat', 'Kuwait City', 'Bahrain'
];

// ============================================================
// AIRPORT DATA
// ============================================================
const airportData = {
    'mumbai': 'Chhatrapati Shivaji International Airport',
    'delhi': 'Indira Gandhi International Airport',
    'bangalore': 'Kempegowda International Airport',
    'chennai': 'Chennai International Airport',
    'hyderabad': 'Rajiv Gandhi International Airport',
    'kolkata': 'Netaji Subhas Chandra Bose International Airport',
    'pune': 'Pune International Airport',
    'ahmedabad': 'Sardar Vallabhbhai Patel International Airport',
    'goa': 'Goa International Airport',
    'kochi': 'Cochin International Airport',
    'thiruvananthapuram': 'Trivandrum International Airport',
    'jaipur': 'Jaipur International Airport',
    'lucknow': 'Chaudhary Charan Singh International Airport',
    'guwahati': 'Lokpriya Gopinath Bordoloi International Airport',
    'patna': 'Jay Prakash Narayan Airport',
    'bhubaneswar': 'Biju Patnaik Airport',
    'vadodara': 'Vadodara Airport',
    'nagpur': 'Dr. Babasaheb Ambedkar International Airport',
    'indore': 'Devi Ahilya Bai Holkar Airport',
    'amritsar': 'Sri Guru Ram Dass Jee International Airport',
    'chandigarh': 'Chandigarh Airport',
    'surat': 'Surat Airport',
    'raipur': 'Swami Vivekananda Airport',
    'ranchi': 'Birsa Munda Airport',
    'dehradun': 'Jolly Grant Airport',
    'vijayawada': 'Vijayawada Airport',
    'visakhapatnam': 'Visakhapatnam Airport',
    'mangalore': 'Mangalore Airport',
    'calicut': 'Calicut International Airport',
    'singapore': 'Changi Airport',
    'dubai': 'Dubai International Airport',
    'london': 'Heathrow Airport',
    'new york': 'John F Kennedy International Airport',
    'tokyo': 'Narita International Airport',
    'paris': 'Charles de Gaulle Airport',
    'frankfurt': 'Frankfurt Airport',
    'amsterdam': 'Amsterdam Airport Schiphol',
    'rome': 'Leonardo da Vinci–Fiumicino Airport',
    'madrid': 'Adolfo Suárez Madrid–Barajas Airport',
    'barcelona': 'Barcelona–El Prat Airport',
    'istanbul': 'Istanbul Airport',
    'moscow': 'Sheremetyevo International Airport',
    'beijing': 'Beijing Capital International Airport',
    'shanghai': 'Shanghai Pudong International Airport',
    'hong kong': 'Hong Kong International Airport',
    'bangkok': 'Suvarnabhumi Airport',
    'kuala lumpur': 'Kuala Lumpur International Airport',
    'jakarta': 'Soekarno–Hatta International Airport',
    'manila': 'Ninoy Aquino International Airport',
    'sydney': 'Sydney Kingsford Smith Airport',
    'melbourne': 'Melbourne Airport',
    'auckland': 'Auckland Airport',
    'toronto': 'Toronto Pearson International Airport',
    'vancouver': 'Vancouver International Airport',
    'chicago': "O'Hare International Airport",
    'los angeles': 'Los Angeles International Airport',
    'san francisco': 'San Francisco International Airport',
    'miami': 'Miami International Airport',
    'dallas': 'Dallas/Fort Worth International Airport',
    'atlanta': 'Hartsfield–Jackson Atlanta International Airport',
    'denver': 'Denver International Airport',
    'seattle': 'Seattle–Tacoma International Airport',
    'boston': 'Boston Logan International Airport',
    'washington': 'Washington Dulles International Airport',
    'cairo': 'Cairo International Airport',
    'johannesburg': 'O. R. Tambo International Airport',
    'cape town': 'Cape Town International Airport',
    'nairobi': 'Jomo Kenyatta International Airport',
    'casablanca': 'Mohammed V International Airport',
    'lagos': 'Murtala Muhammed International Airport',
    'doha': 'Hamad International Airport',
    'abu dhabi': 'Abu Dhabi International Airport',
    'riyadh': 'King Khalid International Airport',
    'muscat': 'Muscat International Airport',
    'kuwait city': 'Kuwait International Airport',
    'bahrain': 'Bahrain International Airport'
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getAirportName(cityName) {
    const lower = cityName.toLowerCase().trim();
    if (airportData[lower]) return airportData[lower];
    for (const [key, value] of Object.entries(airportData)) {
        if (lower.includes(key) || key.includes(lower)) return value;
    }
    return `${cityName} Airport`;
}

function formatDuration(minutes) {
    if (!minutes || minutes < 0) return '--';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
}

function getRandomGate() {
    return String(Math.floor(Math.random() * 8) + 1);
}

function getRandomTerminal() {
    return 'T' + String(Math.floor(Math.random() * 5) + 1);
}

function getRandomDuration() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const mins = Math.floor(Math.random() * 60);
    return {
        hours,
        mins,
        formatted: `${hours}h ${String(mins).padStart(2, '0')}m`
    };
}

function getRandomPrice(basePrice = 10000) {
    return Math.floor(basePrice + Math.random() * basePrice * 0.8);
}

function getRandomStatus() {
    const statuses = ['On Time', 'Scheduled', 'Boarding', 'Delayed', 'On Time', 'On Time', 'Scheduled'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomStops() {
    const options = ['Direct', 'Direct', 'Direct', '1 Stop', '1+ Stop'];
    return options[Math.floor(Math.random() * options.length)];
}

function generateTime() {
    const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${h}:${m}`;
}

function generateArrivalTime(depTime, duration) {
    const [h, m] = depTime.split(':').map(Number);
    const totalMins = h * 60 + m + duration.hours * 60 + duration.mins;
    const newH = Math.floor(totalMins / 60) % 24;
    const newM = totalMins % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

// ============================================================
// FLIGHT GENERATION - 150+ Flights, 50+ Cities
// ============================================================

function generateFlights() {
    const airlines = [
        { name: 'Air India', code: 'AI' },
        { name: 'IndiGo', code: '6E' },
        { name: 'SpiceJet', code: 'SG' },
        { name: 'Vistara', code: 'UK' },
        { name: 'GoAir', code: 'G8' },
        { name: 'Akasa Air', code: 'QP' },
        { name: 'Singapore Airlines', code: 'SQ' },
        { name: 'Emirates', code: 'EK' },
        { name: 'British Airways', code: 'BA' },
        { name: 'Lufthansa', code: 'LH' },
        { name: 'Qatar Airways', code: 'QR' },
        { name: 'Etihad Airways', code: 'EY' },
        { name: 'Malaysia Airlines', code: 'MH' },
        { name: 'Thai Airways', code: 'TG' },
        { name: 'Japan Airlines', code: 'JL' },
        { name: 'American Airlines', code: 'AA' },
        { name: 'Delta Air Lines', code: 'DL' },
        { name: 'United Airlines', code: 'UA' },
        { name: 'Air France', code: 'AF' },
        { name: 'KLM', code: 'KL' },
        { name: 'Swiss Air', code: 'LX' },
        { name: 'Turkish Airlines', code: 'TK' },
        { name: 'Ethiopian Airlines', code: 'ET' },
        { name: 'Kenya Airways', code: 'KQ' },
        { name: 'Saudi Airlines', code: 'SV' },
        { name: 'Oman Air', code: 'WY' },
        { name: 'Gulf Air', code: 'GF' },
        { name: 'Air Arabia', code: 'G9' },
        { name: 'Cathay Pacific', code: 'CX' },
        { name: 'Korean Air', code: 'KE' },
        { name: 'Asiana Airlines', code: 'OZ' },
        { name: 'China Eastern', code: 'MU' },
        { name: 'China Southern', code: 'CZ' },
        { name: 'Air China', code: 'CA' },
        { name: 'ANA', code: 'NH' }
    ];

    // Domestic routes
    const domesticDestinations = {
        'Mumbai': ['Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Goa', 'Jaipur',
            'Lucknow', 'Patna', 'Guwahati', 'Bhubaneswar', 'Vadodara', 'Nagpur', 'Indore', 'Amritsar', 'Chandigarh',
            'Surat', 'Raipur', 'Ranchi', 'Dehradun', 'Vijayawada', 'Visakhapatnam', 'Mangalore', 'Calicut'
        ],
        'Delhi': ['Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Goa', 'Jaipur',
            'Lucknow', 'Patna', 'Guwahati', 'Bhubaneswar', 'Amritsar', 'Chandigarh', 'Surat', 'Raipur', 'Ranchi',
            'Dehradun', 'Visakhapatnam', 'Mangalore'
        ],
        'Bangalore': ['Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Goa', 'Jaipur',
            'Lucknow', 'Patna', 'Guwahati', 'Bhubaneswar', 'Vadodara', 'Nagpur', 'Indore', 'Amritsar', 'Chandigarh',
            'Surat', 'Raipur', 'Ranchi', 'Dehradun', 'Vijayawada', 'Visakhapatnam', 'Mangalore', 'Calicut'
        ],
        'Chennai': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Goa', 'Jaipur',
            'Lucknow', 'Patna', 'Guwahati', 'Bhubaneswar', 'Vadodara', 'Nagpur', 'Indore', 'Amritsar', 'Chandigarh',
            'Surat', 'Raipur', 'Ranchi', 'Dehradun', 'Vijayawada', 'Visakhapatnam', 'Mangalore', 'Calicut'
        ]
    };

    // International routes
    const internationalDestinations = {
        'Mumbai': ['Singapore', 'Dubai', 'London', 'New York', 'Tokyo', 'Paris', 'Frankfurt', 'Amsterdam', 'Rome',
            'Madrid', 'Barcelona', 'Istanbul', 'Moscow', 'Beijing', 'Shanghai', 'Hong Kong', 'Bangkok',
            'Kuala Lumpur', 'Jakarta', 'Manila', 'Sydney', 'Melbourne', 'Auckland', 'Toronto', 'Vancouver',
            'Chicago', 'Los Angeles', 'San Francisco', 'Miami', 'Dallas', 'Atlanta', 'Denver', 'Seattle',
            'Boston', 'Washington', 'Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca', 'Lagos',
            'Doha', 'Abu Dhabi', 'Riyadh', 'Muscat', 'Kuwait City', 'Bahrain'
        ],
        'Delhi': ['Singapore', 'Dubai', 'London', 'New York', 'Tokyo', 'Paris', 'Frankfurt', 'Amsterdam', 'Rome',
            'Madrid', 'Barcelona', 'Istanbul', 'Moscow', 'Beijing', 'Shanghai', 'Hong Kong', 'Bangkok',
            'Kuala Lumpur', 'Jakarta', 'Manila', 'Sydney', 'Melbourne', 'Auckland', 'Toronto', 'Vancouver',
            'Chicago', 'Los Angeles', 'San Francisco', 'Miami', 'Dallas', 'Atlanta', 'Denver', 'Seattle',
            'Boston', 'Washington', 'Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca', 'Lagos',
            'Doha', 'Abu Dhabi', 'Riyadh', 'Muscat', 'Kuwait City', 'Bahrain'
        ],
        'Bangalore': ['Singapore', 'Dubai', 'London', 'Tokyo', 'Paris', 'Frankfurt', 'Amsterdam', 'Rome',
            'Bangkok', 'Kuala Lumpur', 'Jakarta', 'Manila', 'Sydney', 'Melbourne', 'Auckland', 'Toronto',
            'Vancouver', 'Chicago', 'Los Angeles', 'San Francisco', 'Miami', 'Dallas', 'Atlanta', 'Denver',
            'Seattle', 'Boston', 'Washington', 'Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca',
            'Lagos', 'Doha', 'Abu Dhabi', 'Riyadh', 'Muscat', 'Kuwait City', 'Bahrain'
        ],
        'Chennai': ['Singapore', 'Dubai', 'Kuala Lumpur', 'Bangkok', 'Tokyo', 'London', 'Paris', 'Frankfurt',
            'Amsterdam', 'Rome', 'Sydney', 'Melbourne', 'Auckland', 'Toronto', 'Vancouver', 'Chicago',
            'Los Angeles', 'San Francisco', 'Miami', 'Dallas', 'Atlanta', 'Denver', 'Seattle', 'Boston',
            'Washington', 'Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca', 'Lagos', 'Doha',
            'Abu Dhabi', 'Riyadh', 'Muscat', 'Kuwait City', 'Bahrain'
        ],
        'Hyderabad': ['Dubai', 'Singapore', 'Kuala Lumpur', 'Bangkok', 'London', 'Tokyo', 'Paris', 'Frankfurt',
            'Amsterdam', 'Rome', 'Sydney', 'Melbourne', 'Auckland', 'Toronto', 'Vancouver', 'Chicago',
            'Los Angeles', 'San Francisco', 'Miami', 'Dallas', 'Atlanta', 'Denver', 'Seattle', 'Boston',
            'Washington', 'Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca', 'Lagos', 'Doha',
            'Abu Dhabi', 'Riyadh', 'Muscat', 'Kuwait City', 'Bahrain'
        ],
        'Kolkata': ['Singapore', 'Dubai', 'Bangkok', 'Kuala Lumpur', 'Tokyo', 'London', 'Paris', 'Frankfurt',
            'Amsterdam', 'Rome', 'Sydney', 'Melbourne', 'Auckland', 'Toronto', 'Vancouver', 'Chicago',
            'Los Angeles', 'San Francisco', 'Miami', 'Dallas', 'Atlanta', 'Denver', 'Seattle', 'Boston',
            'Washington', 'Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca', 'Lagos', 'Doha',
            'Abu Dhabi', 'Riyadh', 'Muscat', 'Kuwait City', 'Bahrain'
        ]
    };

    const flights = [];
    let flightNum = 1;

    // Generate domestic flights (3-6 per route)
    for (const [from, destinations] of Object.entries(domesticDestinations)) {
        const count = Math.min(destinations.length, Math.floor(Math.random() * 4) + 3);
        const selectedDests = destinations.slice(0, count);
        
        for (const to of selectedDests) {
            const numFlights = Math.floor(Math.random() * 4) + 3; // 3-6 flights per route
            const basePrice = Math.floor(Math.random() * 3000) + 1500;

            for (let i = 0; i < numFlights && flightNum < 500; i++) {
                const airline = airlines[Math.floor(Math.random() * airlines.length)];
                const flightNo = `${airline.code}${String(flightNum++).padStart(3, '0')}`;
                const depTime = generateTime();
                const duration = getRandomDuration();
                const arrTime = generateArrivalTime(depTime, duration);
                const price = getRandomPrice(basePrice);
                const status = getRandomStatus();
                const stops = getRandomStops();

                flights.push({
                    airline: airline.name,
                    number: flightNo,
                    dep: depTime,
                    arr: arrTime,
                    duration: duration.formatted,
                    price: price,
                    status: status,
                    stops: stops,
                    from: from,
                    fromCode: from.substring(0, 3).toUpperCase(),
                    to: to,
                    toCode: to.substring(0, 3).toUpperCase(),
                    fromAirport: getAirportName(from),
                    fromTerminal: getRandomTerminal(),
                    toAirport: getAirportName(to),
                    toTerminal: getRandomTerminal(),
                    gate: getRandomGate(),
                    terminal: getRandomTerminal(),
                    isUserAdded: false
                });
            }
        }
    }

    // Generate international flights (3-5 per route)
    for (const [from, destinations] of Object.entries(internationalDestinations)) {
        const count = Math.min(destinations.length, Math.floor(Math.random() * 15) + 5);
        const selectedDests = destinations.slice(0, count);
        
        for (const to of selectedDests) {
            const numFlights = Math.floor(Math.random() * 3) + 3; // 3-5 flights per route
            const basePrice = Math.floor(Math.random() * 30000) + 15000;

            for (let i = 0; i < numFlights && flightNum < 500; i++) {
                const airline = airlines[Math.floor(Math.random() * airlines.length)];
                const flightNo = `${airline.code}${String(flightNum++).padStart(3, '0')}`;
                const depTime = generateTime();
                const duration = getRandomDuration();
                const arrTime = generateArrivalTime(depTime, duration);
                const price = getRandomPrice(basePrice);
                const status = getRandomStatus();
                const stops = getRandomStops();

                flights.push({
                    airline: airline.name,
                    number: flightNo,
                    dep: depTime,
                    arr: arrTime,
                    duration: duration.formatted,
                    price: price,
                    status: status,
                    stops: stops,
                    from: from,
                    fromCode: from.substring(0, 3).toUpperCase(),
                    to: to,
                    toCode: to.substring(0, 3).toUpperCase(),
                    fromAirport: getAirportName(from),
                    fromTerminal: getRandomTerminal(),
                    toAirport: getAirportName(to),
                    toTerminal: getRandomTerminal(),
                    gate: getRandomGate(),
                    terminal: getRandomTerminal(),
                    isUserAdded: false
                });
            }
        }
    }

    return flights;
}

// ============================================================
// INITIALIZE SYSTEM
// ============================================================

function initializeSystem() {
    const generatedFlights = generateFlights();
    const uniqueRoutes = new Set(generatedFlights.map(f => `${f.from}-${f.to}`));
    const uniqueFrom = new Set(generatedFlights.map(f => f.from));

    console.log(`✈️ Generated ${generatedFlights.length} flights`);
    console.log(`🌍 Routes: ${uniqueRoutes.size}`);
    console.log(`🏙️ Departure cities: ${uniqueFrom.size}`);

    generatedFlights.forEach(f => {
        const flight = { 
            id: 'F' + String(flightIdCounter++).padStart(4, '0'), 
            ...f, 
            isUserAdded: false 
        };
        allFlights.push(flight);
        flightStatusList.append(flight);
    });

    console.log('✅ System initialized successfully!');
}

// ============================================================
// STOP MANAGEMENT
// ============================================================

function addStopItem(city = '', arrDate = '', arrHour = '', arrMin = '', depHour = '', depMin = '') {
    const container = document.getElementById('stopContainer');
    const id = ++stopCounter;
    
    const html = `
        <div class="stop-item" data-stop-id="${id}">
            <div class="stop-header">
                <span class="stop-title"><i class="fas fa-map-marker-alt"></i> Stop #${id}</span>
                <button type="button" class="remove-stop" onclick="removeStopItem(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="stop-fields">
                <div class="field">
                    <label>Stop City</label>
                    <input type="text" class="stop-city" placeholder="e.g. Dubai" value="${city}">
                </div>
                <div class="field">
                    <label>Arrival Date</label>
                    <input type="date" class="stop-arrival-date" value="${arrDate}">
                </div>
                <div class="field">
                    <label>Arrival Time</label>
                    <div class="time-columns">
                        <select class="stop-hour stop-arrival-hour">
                            <option value="">Hour</option>
                        </select>
                        <select class="stop-minute stop-arrival-minute">
                            <option value="">Min</option>
                        </select>
                    </div>
                </div>
                <div class="field">
                    <label>Departure Time</label>
                    <div class="time-columns">
                        <select class="stop-hour stop-departure-hour">
                            <option value="">Hour</option>
                        </select>
                        <select class="stop-minute stop-departure-minute">
                            <option value="">Min</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);

    // Populate hour and minute dropdowns for this stop
    const hourSelectors = container.querySelectorAll('.stop-hour');
    const minuteSelectors = container.querySelectorAll('.stop-minute');
    
    hourSelectors.forEach(sel => {
        for (let i = 0; i <= 23; i++) {
            const v = String(i).padStart(2, '0');
            const o = document.createElement('option');
            o.value = v;
            o.textContent = v;
            o.style.color = '#000000';
            o.style.backgroundColor = '#f0f5fa';
            sel.appendChild(o);
        }
        if (arrHour && sel.classList.contains('stop-arrival-hour')) sel.value = arrHour;
        if (depHour && sel.classList.contains('stop-departure-hour')) sel.value = depHour;
    });
    
    minuteSelectors.forEach(sel => {
        for (let i = 0; i <= 59; i++) {
            const v = String(i).padStart(2, '0');
            const o = document.createElement('option');
            o.value = v;
            o.textContent = v;
            o.style.color = '#000000';
            o.style.backgroundColor = '#f0f5fa';
            sel.appendChild(o);
        }
        if (arrMin && sel.classList.contains('stop-arrival-minute')) sel.value = arrMin;
        if (depMin && sel.classList.contains('stop-departure-minute')) sel.value = depMin;
    });
}

function removeStopItem(btn) {
    const item = btn.closest('.stop-item');
    if (document.querySelectorAll('.stop-item').length <= 1) {
        alert('At least one stop is required.');
        return;
    }
    item.remove();
}

function toggleStopSection(show) {
    const section = document.getElementById('stopSection');
    if (show) {
        section.classList.add('visible');
        if (document.querySelectorAll('.stop-item').length === 0) addStopItem();
        document.getElementById('addStopBtn').style.display = 
            document.getElementById('flightStops').value === '1+ Stop' ? 'inline-flex' : 'none';
    } else {
        section.classList.remove('visible');
        document.getElementById('stopContainer').innerHTML = '';
        stopCounter = 0;
    }
}

// ============================================================
// SEARCH FUNCTIONS
// ============================================================

function performSearch() {
    const fromInput = document.getElementById('searchFrom').value.trim().toLowerCase();
    const toInput = document.getElementById('searchTo').value.trim().toLowerCase();
    lastSearchedFrom = fromInput;
    lastSearchedTo = toInput;

    console.log('🔍 Searching for:', fromInput || '(any)', '→', toInput || '(any)');

    if (!fromInput && !toInput) {
        const container = document.getElementById('flightResults');
        container.innerHTML = `
            <div class="placeholder-message" id="placeholderMsg">
                <i class="fas fa-search"></i>
                <h3>Search for flights</h3>
                <p>Enter your origin and destination, then click the <strong>Search</strong> button.</p>
            </div>
        `;
        document.getElementById('flightCount').textContent = '0';
        currentResults = [];
        refreshStatusBoard();
        return;
    }

    searchPerformed = true;

    let filtered = allFlights.filter(f => {
        const fromMatch = !fromInput || 
            f.from.toLowerCase().includes(fromInput) || 
            f.fromCode.toLowerCase().includes(fromInput);
        const toMatch = !toInput || 
            f.to.toLowerCase().includes(toInput) || 
            f.toCode.toLowerCase().includes(toInput);
        return fromMatch && toMatch;
    });

    console.log('✈️ Matched flights before filter:', filtered.length);

    // Apply filters
    if (currentFilter === 'direct') {
        filtered = filtered.filter(f => f.stops === 'Direct');
    } else if (currentFilter === '1stop') {
        filtered = filtered.filter(f => f.stops === '1 Stop');
    } else if (currentFilter === '1plus') {
        filtered = filtered.filter(f => f.stops === '1+ Stop');
    } else if (currentFilter === 'delayed') {
        filtered = filtered.filter(f => f.status === 'Delayed');
    } else if (currentFilter === 'on-time') {
        filtered = filtered.filter(f => f.status === 'On Time' || f.status === 'Scheduled');
    }

    console.log('📋 After filter:', filtered.length, 'flights');

    currentResults = filtered;
    renderFlights(filtered);
    refreshStatusBoard();
}

// ============================================================
// RENDER FLIGHTS
// ============================================================

function renderFlights(flights) {
    const container = document.getElementById('flightResults');
    const placeholder = document.getElementById('placeholderMsg');
    if (placeholder) placeholder.remove();

    if (!flights || flights.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-plane-slash"></i>
                <h3>No flights found</h3>
                <p>Try adjusting your search criteria or add a new flight.</p>
                ${lastSearchedFrom ? `<p style="margin-top:10px;color:var(--text-muted);">From: <strong>${lastSearchedFrom}</strong> ${lastSearchedTo ? `→ To: <strong>${lastSearchedTo}</strong>` : ''}</p>` : ''}
            </div>
        `;
        document.getElementById('flightCount').textContent = '0';
        return;
    }

    document.getElementById('flightCount').textContent = flights.length;

    let html = '';
    flights.forEach((f, index) => {
        const statusClass = f.status === 'Delayed' ? 'delayed' : f.status === 'Cancelled' ? 'cancelled' : '';
        const cardClass = f.status === 'Delayed' ? 'delayed-card' : f.status === 'Cancelled' ? 'cancelled-card' : '';
        const priceFormatted = '₹' + (f.price || 0).toLocaleString('en-IN');
        const colors = ['#00bfff', '#ff6b6b', '#ffd93d', '#6bcb77', '#a29bfe', '#fd79a8', '#fdcb6e', '#ff9ff3', '#54a0ff', '#5f27cd'];
        const color = colors[index % colors.length];
        const stopLabel = f.stops === 'Direct' ? 'Non-stop' : f.stops;
        const fromAirport = f.fromAirport || getAirportName(f.from) || '';
        const toAirport = f.toAirport || getAirportName(f.to) || '';
        const userBadge = f.isUserAdded ? '<span class="user-badge"><i class="fas fa-user-plus"></i> Added by You</span>' : '';
        const delayWarning = f.status === 'Delayed' ? ' <span class="delay-badge"><i class="fas fa-clock"></i> Delayed</span>' : '';

        html += `
            <div class="flight-card ${cardClass}">
                <div class="flight-info">
                    <div class="airline-info">
                        <div class="airline-logo" style="color:${color};border-color:${color}33;">
                            <i class="fas fa-plane"></i>
                        </div>
                        <div class="airline-name">
                            ${f.number}
                            <span class="sub">${f.airline} ${userBadge}</span>
                        </div>
                    </div>
                    <div class="flight-route">
                        <div class="route-point">
                            <div class="time">${f.dep || f.departureTime || '--:--'}</div>
                            <div class="city">${f.fromCode}</div>
                            <div class="airport">${fromAirport}</div>
                        </div>
                        <div class="flight-meta">
                            <span class="duration">${f.duration || '--'}</span>
                            <span class="stops">${stopLabel}</span>
                        </div>
                        <div class="route-point">
                            <div class="time">${f.arr || f.arrivalTime || '--:--'}</div>
                            <div class="city">${f.toCode}</div>
                            <div class="airport">${toAirport}</div>
                        </div>
                    </div>
                </div>
                <div class="flight-details">
                    <div class="price">${priceFormatted} <span>per adult</span></div>
                    <div class="status-badge ${statusClass}">${f.status} ${delayWarning}</div>
                    <div class="gate-terminal">Gate ${f.gate || '--'} · Terminal ${f.terminal || '--'}</div>
                    <button class="book-btn" onclick="bookFlight('${f.id}')">
                        <i class="fas fa-ticket-alt"></i> Book
                    </button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// ============================================================
// SORT FLIGHTS
// ============================================================

function sortFlights(type) {
    currentSort = type;
    document.querySelectorAll('.sort-options button').forEach(b => b.classList.remove('active'));
    const btnIndex = type === 'departure' ? 1 : type === 'arrival' ? 2 : type === 'delay' ? 3 : 4;
    document.querySelector(`.sort-options button:nth-child(${btnIndex})`).classList.add('active');

    if (!currentResults || currentResults.length === 0) return;

    const sorted = [...currentResults];
    if (type === 'departure') {
        sorted.sort((a, b) => (a.dep || a.departureTime || '00:00').localeCompare(b.dep || b.departureTime || '00:00'));
    } else if (type === 'arrival') {
        sorted.sort((a, b) => (a.arr || a.arrivalTime || '00:00').localeCompare(b.arr || b.arrivalTime || '00:00'));
    } else if (type === 'delay') {
        sorted.sort((a, b) => {
            if (a.status === 'Delayed' && b.status !== 'Delayed') return -1;
            if (a.status !== 'Delayed' && b.status === 'Delayed') return 1;
            return 0;
        });
    } else if (type === 'price') {
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    
    currentResults = sorted;
    renderFlights(sorted);
}

// ============================================================
// FILTER TAGS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            if (searchPerformed) performSearch();
        });
    });
});

// ============================================================
// BOOK FLIGHT
// ============================================================

function bookFlight(flightId) {
    const flight = allFlights.find(f => f.id === flightId);
    if (flight) {
        alert(
            `✈ Booking confirmed for ${flight.airline} flight ${flight.number}\n` +
            `Route: ${flight.from} → ${flight.to}\n` +
            `Departure: ${flight.dep || '--:--'}\n` +
            `Gate: ${flight.gate || 'N/A'} · Terminal: ${flight.terminal || 'N/A'}\n` +
            `Price: ₹${(flight.price || 0).toLocaleString('en-IN')}`
        );
    }
}

// ============================================================
// ADD FLIGHT
// ============================================================

function addFlight() {
    const number = document.getElementById('flightNumber').value.trim().toUpperCase();
    const airline = document.getElementById('airline').value.trim();
    const from = document.getElementById('fromCity').value.trim();
    const to = document.getElementById('toCity').value.trim();
    const departureDate = document.getElementById('departureDate').value;
    const departureHour = document.getElementById('departureHour').value;
    const departureMinute = document.getElementById('departureMinute').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const arrivalHour = document.getElementById('arrivalHour').value;
    const arrivalMinute = document.getElementById('arrivalMinute').value;
    const gate = document.getElementById('gate').value.trim();
    const terminal = document.getElementById('terminal').value.trim();
    const priceInput = document.getElementById('ticketPrice').value.trim();
    const status = document.getElementById('flightStatus').value;
    const stopsOption = document.getElementById('flightStops').value;

    if (!number || !airline || !from || !to || !departureDate || !departureHour || 
        !departureMinute || !arrivalDate || !arrivalHour || !arrivalMinute) {
        alert('Please fill all fields.');
        return;
    }

    const depTime = departureHour + ':' + departureMinute;
    const arrTime = arrivalHour + ':' + arrivalMinute;
    const depDateTime = new Date(departureDate + 'T' + depTime);
    const arrDateTime = new Date(arrivalDate + 'T' + arrTime);

    if (isNaN(depDateTime.getTime()) || isNaN(arrDateTime.getTime()) || arrDateTime < depDateTime) {
        alert('Invalid date/time or arrival before departure.');
        return;
    }

    const diffMs = arrDateTime - depDateTime;
    const diffMinutes = Math.round(diffMs / 60000);
    const durationFormatted = formatDuration(diffMinutes);

    let price = 0;
    if (priceInput) {
        const parsed = parseFloat(priceInput);
        if (!isNaN(parsed) && parsed >= 0) price = parsed;
    }

    const fromAirport = getAirportName(from) || 'Not Provided';
    const toAirport = getAirportName(to) || 'Not Provided';

    let stops = [];
    if (stopsOption !== 'Direct') {
        const stopItems = document.querySelectorAll('.stop-item');
        stopItems.forEach(item => {
            const city = item.querySelector('.stop-city').value.trim();
            const arrDate = item.querySelector('.stop-arrival-date').value;
            const arrHour = item.querySelector('.stop-arrival-hour').value;
            const arrMin = item.querySelector('.stop-arrival-minute').value;
            const depHour = item.querySelector('.stop-departure-hour').value;
            const depMin = item.querySelector('.stop-departure-minute').value;
            if (city && arrDate && arrHour && arrMin && depHour && depMin) {
                stops.push({
                    city,
                    arrivalDate: arrDate,
                    arrivalTime: arrHour + ':' + arrMin,
                    departureTime: depHour + ':' + depMin
                });
            }
        });
        if (stops.length === 0 && stopsOption !== 'Direct') {
            alert('Please fill all stop details or select Direct.');
            return;
        }
    }

    const newFlight = {
        id: 'U' + String(allFlights.length + 1).padStart(4, '0'),
        number,
        airline,
        from,
        to,
        fromCode: from.substring(0, 3).toUpperCase(),
        toCode: to.substring(0, 3).toUpperCase(),
        dep: depTime,
        arr: arrTime,
        departureTime: depTime,
        arrivalTime: arrTime,
        duration: durationFormatted,
        price,
        status,
        stops: stopsOption,
        gate: gate || getRandomGate(),
        terminal: terminal || getRandomTerminal(),
        departureDate,
        arrivalDate,
        fromAirport,
        toAirport,
        isUserAdded: true,
        stopDetails: stops
    };

    allFlights.push(newFlight);
    flightStatusList.append(newFlight);

    document.getElementById('flightMessage').innerHTML = `
        <div class="message">
            <i class="fas fa-check-circle" style="color:var(--accent-2);"></i> 
            Flight <strong>${number}</strong> added! Route: ${from} → ${to}
        </div>
    `;

    // Clear form
    document.getElementById('flightNumber').value = '';
    document.getElementById('airline').value = '';
    document.getElementById('fromCity').value = '';
    document.getElementById('toCity').value = '';
    document.getElementById('departureDate').value = '';
    document.getElementById('departureHour').value = '';
    document.getElementById('departureMinute').value = '';
    document.getElementById('arrivalDate').value = '';
    document.getElementById('arrivalHour').value = '';
    document.getElementById('arrivalMinute').value = '';
    document.getElementById('gate').value = '';
    document.getElementById('terminal').value = '';
    document.getElementById('ticketPrice').value = '';
    document.getElementById('flightStatus').value = 'Scheduled';
    document.getElementById('flightStops').value = 'Direct';
    toggleStopSection(false);

    if (searchPerformed) performSearch();
    else refreshStatusBoard();
}

// ============================================================
// SEARCH FLIGHT BY NUMBER
// ============================================================

function searchFlight() {
    const inputRaw = document.getElementById('searchFlightInput').value.trim();
    if (!inputRaw) {
        alert('Enter Flight Number.');
        return;
    }

    const input = inputRaw.replace(/\s/g, '').toUpperCase();
    const result = document.getElementById('flightResult');

    const flight = allFlights.find(f => f.number.replace(/\s/g, '') === input);
    result.style.display = 'block';

    if (!flight) {
        result.innerHTML = `
            <div style="text-align:center;padding:40px 20px;">
                <i class="fas fa-times-circle" style="color:#e67e22;font-size:40px;margin-bottom:15px;display:block;"></i>
                <h3 style="color:#ff6b6b;">Flight Not Found</h3>
                <p>No flight with number <strong>${inputRaw}</strong> exists.</p>
            </div>
        `;
        return;
    }

    const statusClass = flight.status === 'Delayed' ? 'delayed' : flight.status === 'Cancelled' ? 'cancelled' : '';
    const priceFormatted = '₹' + (flight.price || 0).toLocaleString('en-IN');
    const userBadge = flight.isUserAdded ? ' <span class="s-badge">(Added by You)</span>' : '';
    const stopLabel = flight.stops === 'Direct' ? 'Direct' : flight.stops;

    result.innerHTML = `
        <div class="search-result-list">
            <div class="s-title">
                <i class="fas fa-plane" style="color:var(--accent-2);"></i> 
                ${flight.number} ${userBadge}
            </div>
            <div class="s-row"><span class="s-label">Airline</span><span class="s-value">${flight.airline}</span></div>
            <div class="s-row"><span class="s-label">Route</span><span class="s-value">${flight.from} → ${flight.to}</span></div>
            <div class="s-row"><span class="s-label">Departure</span><span class="s-value">${flight.dep || flight.departureTime || '--:--'}</span></div>
            <div class="s-row"><span class="s-label">Arrival</span><span class="s-value">${flight.arr || flight.arrivalTime || '--:--'}</span></div>
            <div class="s-row"><span class="s-label">Duration</span><span class="s-value">${flight.duration || '--'}</span></div>
            <div class="s-row"><span class="s-label">Stops</span><span class="s-value">${stopLabel}</span></div>
            ${flight.stopDetails && flight.stopDetails.length > 0 ? `
            <div class="s-row" style="flex-direction:column;align-items:flex-start;padding:12px 0;">
                <span class="s-label" style="min-width:auto;margin-bottom:6px;">Stop Details</span>
                <div style="width:100%;">
                    ${flight.stopDetails.map((stop, idx) => `
                        <div style="background:rgba(0,40,70,0.3);border-radius:12px;padding:10px 14px;margin-bottom:6px;font-size:14px;color:var(--text-secondary);">
                            <strong>Stop ${idx+1}:</strong> ${stop.city} (Arr: ${stop.arrivalDate || '--'} ${stop.arrivalTime || '--'}, Dep: ${stop.departureTime || '--'})
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            <div class="s-row">
                <span class="s-label">Price</span>
                <span class="s-value">
                    <span class="s-price">${priceFormatted}</span> 
                    <span style="color:var(--text-muted);font-size:13px;">per adult</span>
                </span>
            </div>
            <div class="s-row">
                <span class="s-label">Gate · Terminal</span>
                <span class="s-value">
                    <span class="s-gate">Gate ${flight.gate || '--'} · Terminal ${flight.terminal || '--'}</span>
                </span>
            </div>
            <div class="s-row" style="border-bottom:none;padding-bottom:4px;">
                <span class="s-label">Status</span>
                <span class="s-value">
                    <span class="status-badge-sm ${statusClass}">${flight.status}</span>
                </span>
            </div>
            <button class="s-book-btn" onclick="bookFlight('${flight.id}')">
                <i class="fas fa-ticket-alt"></i> Book Now
            </button>
        </div>
    `;
}

// ============================================================
// ADD PASSENGER
// ============================================================

function addPassenger() {
    const name = document.getElementById('passengerName').value.trim();
    const flightNumber = document.getElementById('passengerFlight').value.trim().toUpperCase();
    const seat = document.getElementById('passengerSeat').value.trim().toUpperCase();
    const status = document.getElementById('passengerStatus').value;
    const isPriority = document.querySelector('input[name="priority"]:checked').value === 'priority';

    if (!name || !flightNumber || !seat) {
        alert('Please fill all passenger fields.');
        return;
    }

    const passengerID = 'P' + String(passengerCounter++).padStart(3, '0');
    const passenger = { 
        id: passengerID, 
        name, 
        flight: flightNumber, 
        seat, 
        status, 
        priority: isPriority 
    };

    let flight = allFlights.find(f => f.number === flightNumber);
    if (!flight) {
        flight = {
            id: 'U' + String(allFlights.length + 1).padStart(4, '0'),
            number: flightNumber,
            airline: 'Not Provided',
            from: 'Unknown',
            fromCode: '---',
            to: 'Unknown',
            toCode: '---',
            dep: '',
            arr: '',
            duration: '--',
            price: 0,
            status: 'Scheduled',
            stops: 'Direct',
            gate: getRandomGate(),
            terminal: getRandomTerminal(),
            isUserAdded: true
        };
        allFlights.push(flight);
        flightStatusList.append(flight);
    }

    allPassengers.push(passenger);

    if (status === 'Checked-In') {
        if (isPriority) {
            priorityQueue.enqueue(passenger, 1);
        } else {
            regularQueue.enqueue(passenger);
        }
    }

    document.getElementById('passengerMessage').innerHTML = `
        <div class="message">
            <i class="fas fa-user-check" style="color:var(--accent-5);"></i> 
            Passenger <strong>${name}</strong> added · ID: ${passengerID} · 
            ${isPriority ? '⭐ Priority' : 'Normal'} · 
            ${status === 'Checked-In' ? 'Added to queue' : 'Not checked in'}
        </div>
    `;

    document.getElementById('passengerName').value = '';
    document.getElementById('passengerFlight').value = '';
    document.getElementById('passengerSeat').value = '';

    displayQueue();
}

// ============================================================
// QUEUE DISPLAY
// ============================================================

function displayQueue() {
    const regularList = document.getElementById('regularQueueList');
    const priorityList = document.getElementById('priorityQueueList');

    const regularItems = regularQueue.display();
    const priorityItems = priorityQueue.display();

    if (regularItems.length === 0) {
        regularList.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">No passengers in queue</p>';
    } else {
        regularList.innerHTML = regularItems.map((p, i) => `
            <div class="queue-item">
                <span class="q-pos">#${i + 1}</span>
                <span class="q-name">${p.name}</span>
                <span class="q-flight">${p.flight}</span>
            </div>
        `).join('');
    }

    if (priorityItems.length === 0) {
        priorityList.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">No priority passengers</p>';
    } else {
        priorityList.innerHTML = priorityItems.map((p, i) => `
            <div class="queue-item priority">
                <span class="q-pos">#${i + 1}</span>
                <span class="q-name">${p.name} <span class="q-badge"><i class="fas fa-star"></i> Priority</span></span>
                <span class="q-flight">${p.flight}</span>
            </div>
        `).join('');
    }

    document.getElementById('queueMessage').innerHTML = `
        <p style="color:var(--text-muted);font-size:14px;">
            Regular: <strong style="color:var(--accent-2);">${regularQueue.size()}</strong> · 
            Priority: <strong style="color:var(--accent-4);">${priorityQueue.size()}</strong> · 
            Total: <strong style="color:var(--accent-5);">${regularQueue.size() + priorityQueue.size()}</strong>
        </p>
    `;
}

// ============================================================
// PROCESS BOARDING
// ============================================================

function processBoarding() {
    let boarded = null;

    if (!priorityQueue.isEmpty()) {
        boarded = priorityQueue.dequeue();
    } else if (!regularQueue.isEmpty()) {
        boarded = regularQueue.dequeue();
    }

    if (!boarded) {
        document.getElementById('queueMessage').innerHTML = 
            `<p style="color:var(--accent-4);">⚠️ No passengers in queue to board.</p>`;
        return;
    }

    const passenger = allPassengers.find(p => p.id === boarded.id);
    if (passenger) passenger.status = 'Boarded';

    document.getElementById('queueMessage').innerHTML = `
        <p style="color:var(--accent-5);">
            ✅ <strong>${boarded.name}</strong> (${boarded.id}) boarded successfully! 
            ${boarded.priority ? '⭐ Priority' : ''}
        </p>
    `;

    displayQueue();
}

// ============================================================
// ADD PRIORITY TEST
// ============================================================

function addPriorityTest() {
    const names = ['Elderly Passenger', 'Pregnant Passenger', 'Disabled Passenger', 'VIP Customer'];
    const name = names[Math.floor(Math.random() * names.length)];
    const flight = allFlights.length > 0 ? 
        allFlights[Math.floor(Math.random() * allFlights.length)].number : 'SQ-421';

    const passengerID = 'P' + String(passengerCounter++).padStart(3, '0');
    const passenger = { 
        id: passengerID, 
        name, 
        flight, 
        seat: '1A', 
        status: 'Checked-In', 
        priority: true 
    };
    allPassengers.push(passenger);
    priorityQueue.enqueue(passenger, 1);

    document.getElementById('passengerMessage').innerHTML = `
        <div class="message">
            <i class="fas fa-star" style="color:var(--accent-4);"></i> 
            ⭐ Priority passenger <strong>${name}</strong> added to priority queue!
        </div>
    `;

    displayQueue();
}

// ============================================================
// LIVE STATUS BOARD
// ============================================================

function refreshStatusBoard() {
    const board = document.getElementById('statusBoard');

    if (!currentResults || currentResults.length === 0) {
        board.innerHTML = '<p style="color:var(--text-muted);">No flights to display. Search for flights first.</p>';
        return;
    }

    const flights = currentResults.slice(0, 12);

    board.innerHTML = `
        <div class="status-board">
            ${flights.map(f => `
                <div class="status-item">
                    <span class="s-flight">${f.number}</span>
                    <span class="s-status ${f.status === 'On Time' ? 'on-time' : f.status === 'Delayed' ? 'delayed' : f.status === 'Cancelled' ? 'cancelled' : f.status === 'Boarding' ? 'boarding' : 'on-time'}">
                        ${f.status === 'Delayed' ? '⚠️ Delayed' : f.status === 'Cancelled' ? '❌ Cancelled' : f.status === 'Boarding' ? '🎫 Boarding' : '✅ On Time'}
                    </span>
                    <span class="s-gate">Gate ${f.gate || '--'}</span>
                </div>
            `).join('')}
        </div>
        <p style="color:var(--text-muted);font-size:13px;margin-top:12px;">
            Showing ${Math.min(flights.length, 12)} of ${currentResults.length} flights · 
            <span style="color:var(--accent-4);">⚠️ Delayed flights highlighted</span>
        </p>
    `;
}

// ============================================================
// SIMULATE DELAY
// ============================================================

function simulateDelay() {
    const flights = allFlights.filter(f => f.status !== 'Cancelled');
    if (flights.length === 0) {
        alert('No flights available to delay.');
        return;
    }

    const randomFlight = flights[Math.floor(Math.random() * flights.length)];
    randomFlight.status = 'Delayed';
    flightStatusList.update(f => f.id === randomFlight.id, { status: 'Delayed' });

    alert(`⚠️ Flight ${randomFlight.number} has been delayed!`);
    refreshStatusBoard();
    if (searchPerformed) performSearch();
}

// ============================================================
// SIMULATE CANCELLATION
// ============================================================

function simulateCancellation() {
    const flights = allFlights.filter(f => f.status !== 'Cancelled');
    if (flights.length === 0) {
        alert('No flights available to cancel.');
        return;
    }

    const randomFlight = flights[Math.floor(Math.random() * flights.length)];
    randomFlight.status = 'Cancelled';
    flightStatusList.update(f => f.id === randomFlight.id, { status: 'Cancelled' });

    alert(`❌ Flight ${randomFlight.number} has been cancelled!`);
    refreshStatusBoard();
    if (searchPerformed) performSearch();
}

// ============================================================
// DISPLAY FLIGHTS
// ============================================================

function displayFlights() {
    const records = document.getElementById('recordsList');

    if (!lastSearchedFrom && !lastSearchedTo) {
        records.innerHTML = `
            <div class="result" style="display:block;">
                <h3>🔍 No Route Selected</h3>
                <p>Please search for a route first.</p>
            </div>
        `;
        return;
    }

    const filtered = allFlights.filter(f => {
        const fromMatch = !lastSearchedFrom || 
            f.from.toLowerCase().includes(lastSearchedFrom) || 
            f.fromCode.toLowerCase().includes(lastSearchedFrom);
        const toMatch = !lastSearchedTo || 
            f.to.toLowerCase().includes(lastSearchedTo) || 
            f.toCode.toLowerCase().includes(lastSearchedTo);
        return fromMatch && toMatch;
    });

    if (filtered.length === 0) {
        records.innerHTML = `<div class="result" style="display:block;"><h3>✈ No Flights Found</h3></div>`;
        return;
    }

    let output = `
        <div class="sorted-label">
            <i class="fas fa-sort-amount-up"></i> Flights for <strong>${filtered[0].from} → ${filtered[0].to}</strong>
        </div>
        <p style="color:var(--text-muted);font-size:13px;margin:10px 0 20px;">
            Total: <strong style="color:var(--accent-2);">${filtered.length}</strong>
        </p>
    `;

    filtered.slice(0, 20).forEach((f, i) => {
        const userLabel = f.isUserAdded ? 
            ' <span style="color:var(--accent-4);font-size:12px;">(Added by You)</span>' : '';
        output += `
            <div class="record-card">
                <h3>${i+1}. ${f.number} ${userLabel}</h3>
                <p><strong>Airline:</strong> ${f.airline}</p>
                <p><strong>Route:</strong> ${f.from} → ${f.to}</p>
                <p><strong>Departure:</strong> ${f.dep || 'N/A'}</p>
                <p><strong>Arrival:</strong> ${f.arr || 'N/A'}</p>
                <p><strong>Duration:</strong> ${f.duration || '--'}</p>
                <p><strong>Stops:</strong> ${f.stops || 'Direct'}</p>
                <p><strong>Price:</strong> ₹${(f.price || 0).toLocaleString('en-IN')}</p>
                <p><strong>Gate:</strong> ${f.gate || 'Not Assigned'} · <strong>Terminal:</strong> ${f.terminal || 'Not Assigned'}</p>
                <p><strong>Status:</strong> <span class="status">${f.status}</span></p>
            </div>
        `;
    });

    if (filtered.length > 20) {
        output += `<p style="color:var(--text-muted);font-size:13px;margin-top:10px;">Showing 20 of ${filtered.length} flights.</p>`;
    }

    records.innerHTML = output;
}

// ============================================================
// DISPLAY PASSENGERS
// ============================================================

function displayPassengers() {
    const records = document.getElementById('recordsList');
    if (allPassengers.length === 0) {
        records.innerHTML = `<div class="result" style="display:block;"><h3>No Passengers</h3></div>`;
        return;
    }

    let output = `<h3 style="color:var(--text-secondary);margin-top:20px;">
        <i class="fas fa-users"></i> All Passengers (${allPassengers.length})
    </h3>`;
    
    allPassengers.forEach(p => {
        const inQueue = regularQueue.display().some(q => q.id === p.id) || 
                        priorityQueue.display().some(q => q.id === p.id);
        const queueBadge = inQueue ? ' <span style="color:var(--accent-5);font-size:12px;">(In Queue)</span>' : '';
        const priorityBadge = p.priority ? ' <span style="color:var(--accent-4);font-size:12px;">⭐ Priority</span>' : '';
        
        output += `
            <div class="record-card">
                <h3>${p.id} ${queueBadge} ${priorityBadge}</h3>
                <p><strong>Name:</strong> ${p.name}</p>
                <p><strong>Flight:</strong> ${p.flight}</p>
                <p><strong>Seat:</strong> ${p.seat}</p>
                <p><strong>Status:</strong> ${p.status}</p>
            </div>
        `;
    });
    records.innerHTML = output;
}

// ============================================================
// GATE INFORMATION
// ============================================================

function displayGateInfo() {
    const records = document.getElementById('recordsList');

    if (allFlights.length === 0) {
        records.innerHTML = `<div class="result" style="display:block;"><h3>No flights available</h3></div>`;
        return;
    }

    let output = `
        <div class="sorted-label">
            <i class="fas fa-map-signs"></i> Gate Information
        </div>
        <p style="color:var(--text-muted);font-size:13px;margin:10px 0 20px;">
            Find your gate and terminal for each flight.
        </p>
    `;

    allFlights.slice(0, 15).forEach(f => {
        output += `
            <div class="record-card">
                <h3>${f.number}</h3>
                <p><strong>Route:</strong> ${f.from} → ${f.to}</p>
                <p><strong>Gate:</strong> <span style="color:var(--accent-2);font-size:18px;font-weight:700;">${f.gate || 'Not Assigned'}</span></p>
                <p><strong>Terminal:</strong> ${f.terminal || 'Not Assigned'}</p>
                <p><strong>Status:</strong> <span class="status">${f.status}</span></p>
            </div>
        `;
    });

    if (allFlights.length > 15) {
        output += `<p style="color:var(--text-muted);font-size:13px;margin-top:10px;">Showing 15 of ${allFlights.length} flights.</p>`;
    }

    records.innerHTML = output;
}

// ============================================================
// EVENT LISTENERS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the system
    initializeSystem();
    refreshStatusBoard();
    displayQueue();

    // Setup stop management
    document.getElementById('flightStops').addEventListener('change', function() {
        const val = this.value;
        if (val === 'Direct') {
            toggleStopSection(false);
        } else {
            toggleStopSection(true);
            document.getElementById('addStopBtn').style.display = 
                val === '1+ Stop' ? 'inline-flex' : 'none';
            if (document.querySelectorAll('.stop-item').length === 0) addStopItem();
        }
    });
    
    document.getElementById('addStopBtn').addEventListener('click', function() { 
        addStopItem(); 
    });
    
    toggleStopSection(false);

    // Enter key support for search
    document.getElementById('searchFrom').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    
    document.getElementById('searchTo').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    console.log('🚀 Smart Aviation System ready!');
    console.log(`✈️ Total flights loaded: ${allFlights.length}`);
    console.log(`🌍 Total routes: ${new Set(allFlights.map(f => `${f.from}-${f.to}`)).size}`);
    console.log(`🏙️ Departure cities available: ${new Set(allFlights.map(f => f.from)).size}`);
});

// ============================================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================

// These functions are called from HTML onclick attributes
window.performSearch = performSearch;
window.sortFlights = sortFlights;
window.bookFlight = bookFlight;
window.addFlight = addFlight;
window.searchFlight = searchFlight;
window.addPassenger = addPassenger;
window.displayQueue = displayQueue;
window.processBoarding = processBoarding;
window.addPriorityTest = addPriorityTest;
window.refreshStatusBoard = refreshStatusBoard;
window.simulateDelay = simulateDelay;
window.simulateCancellation = simulateCancellation;
window.displayFlights = displayFlights;
window.displayPassengers = displayPassengers;
window.displayGateInfo = displayGateInfo;
window.addStopItem = addStopItem;
window.removeStopItem = removeStopItem;
