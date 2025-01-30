class GarageSystem {
    constructor() {
        this.parkingQueue = [];
        this.carCounters = {};
        this.totalCounters = { arrivalCount: 0, departureCount: 0 };
        this.MAX_CAPACITY = 10;
        this.circlingCars = []; // Track cars that are temporarily removed
    }

    isFull() {
        return this.parkingQueue.length >= this.MAX_CAPACITY;
    }

    handleArrival(plateNumber) {
        if (this.isFull()) {
            return { success: false, message: "Sorry, parking is full!" };
        }

        this.parkingQueue.push(plateNumber);
        this.carCounters[plateNumber] = (this.carCounters[plateNumber] || 0) + 1;
        this.totalCounters.arrivalCount++;
        return { 
            success: true, 
            message: `Car with plate number ${plateNumber} has arrived and parked.`
        };
    }

    handleDeparture(plateNumber) {
        if (!this.parkingQueue.length) {
            return { success: false, message: "Error: Parking is empty!" };
        }

        const carIndex = this.parkingQueue.indexOf(plateNumber);
        if (carIndex === -1) {
            return { 
                success: false, 
                message: `Error: Car with plate number ${plateNumber} is not in the parking garage.`
            };
        }

        // If car is at exit, simply remove it
        if (carIndex === 0) {
            this.parkingQueue.shift();
            this.totalCounters.departureCount++;
            this.carCounters[plateNumber] = (this.carCounters[plateNumber] || 0) + 1;
            return { 
                success: true, 
                message: `Car with plate number ${plateNumber} has departed.`,
                carsToCircle: []
            };
        }

        // If car is not at exit, we need to move cars in front of it temporarily
        const carsInFront = this.parkingQueue.slice(0, carIndex);
        const carsInBack = this.parkingQueue.slice(carIndex + 1);
        
        // Store circling cars and update the parking queue
        this.circlingCars = [...carsInFront];
        
        // Create new queue: back cars first (they move forward), then front cars (they re-enter at back)
        this.parkingQueue = [...carsInBack, ...carsInFront];
        
        // Update counters
        this.totalCounters.departureCount++;
        this.carCounters[plateNumber] = (this.carCounters[plateNumber] || 0) + 1;
        
        // Count movements for circling cars
        carsInFront.forEach(car => {
            this.carCounters[car] = (this.carCounters[car] || 0) + 2; // +2 for exit and re-entry
            this.totalCounters.arrivalCount++;
            this.totalCounters.departureCount++;
        });

        return { 
            success: true, 
            message: `Car with plate number ${plateNumber} has departed.`,
            carsToCircle: carsInFront,
            remainingCars: carsInBack
        };
    }

    getStatus() {
        return {
            parkedCars: [...this.parkingQueue],
            totalArrivals: this.totalCounters.arrivalCount,
            totalDepartures: this.totalCounters.departureCount,
            totalMovements: Object.values(this.carCounters).reduce((a, b) => a + b, 0)
        };
    }
}

class ParkingGarageUI {
    constructor() {
        this.garage = new GarageSystem();
        this.initializeElements();
        this.attachEventListeners();
        this.initializeGarageVisualization();
        this.updateUI();
        this.isAnimating = false;
    }

    initializeElements() {
        // Input elements
        this.plateInput = document.getElementById('plateNumber');
        this.parkButton = document.getElementById('parkButton');
        this.removeButton = document.getElementById('removeButton');
        this.randomPlateButton = document.getElementById('randomPlateButton');
        this.themeToggle = document.getElementById('themeToggle');

        // Display elements
        this.capacityBar = document.getElementById('capacityBar');
        this.capacityLabel = document.getElementById('capacityLabel');
        this.totalArrivals = document.getElementById('totalArrivals');
        this.totalDepartures = document.getElementById('totalDepartures');
        this.totalMovements = document.getElementById('totalMovements');
        this.parkedCarsList = document.getElementById('parkedCarsList');
        this.noticeMessage = document.getElementById('noticeMessage');
        this.modalMessage = document.getElementById('modalMessage');
        this.modal = document.getElementById('messageModal');
        this.modalClose = document.getElementById('modalClose');

        // Add visualization elements
        this.garageQueue = document.getElementById('garageQueue');
        this.initializeGarageVisualization();
        
        // Initialize theme
        this.initializeTheme();
    }

    initializeGarageVisualization() {
        this.garageQueue.innerHTML = '';
        for (let i = 0; i < this.garage.MAX_CAPACITY; i++) {
            const spot = document.createElement('div');
            spot.className = 'parking-spot';
            spot.dataset.index = i;
            this.garageQueue.appendChild(spot);
        }
    }

    generateRandomPlate() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let plate = '';
        
        // Generate 3 random letters
        for (let i = 0; i < 3; i++) {
            plate += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        plate += ' '; // Add space
        
        // Generate 3 random numbers
        for (let i = 0; i < 3; i++) {
            plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        
        return plate;
    }

    async animateCarEntry(plateNumber) {
        const emptySpotIndex = this.garage.MAX_CAPACITY - this.garage.parkingQueue.length;
        const spot = this.garageQueue.children[emptySpotIndex];
        
        // Set up the spot with the plate number but keep it invisible
        spot.classList.add('occupied');
        spot.textContent = plateNumber;
        spot.style.opacity = '0';
        
        // Small delay to ensure styles are applied
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Make visible and start animation
        spot.style.opacity = '1';
        spot.classList.add('entering');
        
        // Wait for animation to complete
        await new Promise(resolve => {
            spot.addEventListener('animationend', () => {
                spot.classList.remove('entering');
                resolve();
            }, { once: true });
        });
    }

    async animateCarExit(plateNumber) {
        const carIndex = this.garage.parkingQueue.indexOf(plateNumber);
        const result = this.garage.handleDeparture(plateNumber);
        
        if (!result.success) {
            return result;
        }

        if (result.carsToCircle.length === 0) {
            // Simple exit animation for car at exit
            const spot = this.garageQueue.children[9];
            spot.classList.add('exiting');
            
            await new Promise(resolve => {
                spot.addEventListener('animationend', () => {
                    spot.classList.remove('occupied', 'exiting');
                    spot.textContent = '';
                    resolve();
                }, { once: true });
            });
    } else {
            // Animate cars that need to circle
            for (let i = 0; i < result.carsToCircle.length; i++) {
                const spot = this.garageQueue.children[9 - i];
                const car = result.carsToCircle[i];
                
                // Exit animation
                spot.classList.add('exiting');
                await new Promise(resolve => {
                    spot.addEventListener('animationend', () => {
                        spot.classList.remove('occupied', 'exiting');
                        spot.textContent = '';
                        resolve();
                    }, { once: true });
                });
            }

            // Animate the departing car
            const departingSpot = this.garageQueue.children[9 - result.carsToCircle.length];
            departingSpot.classList.add('exiting');
            await new Promise(resolve => {
                departingSpot.addEventListener('animationend', () => {
                    departingSpot.classList.remove('occupied', 'exiting');
                    departingSpot.textContent = '';
                    resolve();
                }, { once: true });
            });

            // Animate cars re-entering
            for (let i = result.carsToCircle.length - 1; i >= 0; i--) {
                const spot = this.garageQueue.children[9 - i];
                const car = result.carsToCircle[i];
                
                // Re-entry animation
                spot.classList.add('occupied');
                spot.textContent = car;
                spot.style.opacity = '0';
                spot.classList.add('entering');
                
                await new Promise(resolve => {
                    spot.addEventListener('animationend', () => {
                        spot.classList.remove('entering');
                        spot.style.opacity = '1';
                        resolve();
                    }, { once: true });
                });
            }
        }

            // Animate remaining cars moving up
            if (result.remainingCars && result.remainingCars.length > 0) {
                const promises = [];
                for (let i = carIndex; i < this.garage.parkingQueue.length - result.carsToCircle.length; i++) {
                    const spot = this.garageQueue.children[9 - i];
                    if (spot) {
                        const nextSpot = this.garageQueue.children[9 - (i - 1)];
                        if (nextSpot) {
                            spot.classList.add('shifting');
                            promises.push(new Promise(resolve => {
                                spot.addEventListener('animationend', () => {
                                    spot.classList.remove('shifting');
                                    spot.classList.remove('occupied');
                                    nextSpot.classList.add('occupied');
                                    nextSpot.textContent = spot.textContent;
                                    spot.textContent = '';
                                    resolve();
                                }, { once: true });
                            }));
                        }
                    }
                }
                await Promise.all(promises);
            }
        return result;
    }

    showNotice(message, isError = false) {
        this.noticeMessage.textContent = message;
        this.noticeMessage.className = 'notice-message ' + (isError ? 'error' : 'success');
    }

    clearNotice() {
        this.noticeMessage.textContent = '';
        this.noticeMessage.className = 'notice-message';
    }

    updateUI() {
        const status = this.garage.getStatus();

    // Update statistics
        this.totalArrivals.textContent = `Total Arrivals: ${status.totalArrivals}`;
        this.totalDepartures.textContent = `Total Departures: ${status.totalDepartures}`;
        this.totalMovements.textContent = `Total Movements: ${status.totalMovements}`;

    // Update capacity indicator
        const capacityPercentage = (this.garage.parkingQueue.length / this.garage.MAX_CAPACITY) * 100;
        this.capacityBar.style.width = `${capacityPercentage}%`;
        this.capacityLabel.textContent = `Available Spaces: ${this.garage.MAX_CAPACITY - this.garage.parkingQueue.length}/${this.garage.MAX_CAPACITY}`;

    // Update capacity bar color based on fullness
    if (capacityPercentage >= 80) {
            this.capacityBar.style.background = '#ea4335';  // Red when nearly full
    } else if (capacityPercentage >= 50) {
            this.capacityBar.style.background = '#fbbc04';  // Yellow when half full
        } else {
            this.capacityBar.style.background = '#27ae60';  // Green when mostly empty
        }
        
        // Update visualization
        this.garageQueue.querySelectorAll('.parking-spot').forEach((spot, index) => {
            const carIndex = this.garage.MAX_CAPACITY - 1 - index;
            const car = status.parkedCars[carIndex];
            if (car) {
                spot.classList.add('occupied');
                spot.textContent = car;
            } else {
                spot.classList.remove('occupied');
                spot.textContent = '';
            }
        });
        
        // Update parked cars list
        if (status.parkedCars.length > 0) {
            const carsList = status.parkedCars.map((plate, index) => `
                <div class="car-list-item">
                    <div class="car-info">
                        <span>${plate}</span>
                        <span class="position-label">${index === 0 ? '(Exit)' : index === status.parkedCars.length - 1 ? '(Entrance)' : ''}</span>
                    </div>
                    <button class="btn danger remove-car-btn" data-plate="${plate}">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            `).join('');
            this.parkedCarsList.innerHTML = carsList;

            // Add event listeners to remove buttons
            this.parkedCarsList.querySelectorAll('.remove-car-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const plateNumber = button.dataset.plate;
                    this.plateInput.value = plateNumber;
                    this.handleRemoveCar();
                });
            });
    } else {
            this.parkedCarsList.innerHTML = '<p class="empty-message">No cars currently parked</p>';
        }
    }

    async handleParkCar() {
        if (this.isAnimating) return;
        
        const plateNumber = this.plateInput.value.trim();
        if (!plateNumber) {
            this.showNotice('Please enter a plate number', true);
            return;
        }

        this.isAnimating = true;
        const result = this.garage.handleArrival(plateNumber);
        
        if (result.success) {
            await this.animateCarEntry(plateNumber);
            this.showNotice(result.message);
        } else {
            this.showNotice(result.message, true);
        }
        
        this.plateInput.value = '';
        this.updateUI();
        this.isAnimating = false;
    }

    async handleRemoveCar() {
        if (this.isAnimating) return;
        
        const plateNumber = this.plateInput.value.trim();
    if (!plateNumber) {
            this.showNotice('Please enter a plate number', true);
        return;
    }

        this.isAnimating = true;
        const result = await this.animateCarExit(plateNumber);
        
        if (result.success) {
            this.showNotice(result.message);
        } else {
            this.showNotice(result.message, true);
        }
        
        this.plateInput.value = '';
        
        this.plateInput.value = '';
        this.updateUI();
        this.isAnimating = false;
    }

    initializeTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    attachEventListeners() {
        this.parkButton.addEventListener('click', () => this.handleParkCar());
        this.removeButton.addEventListener('click', () => this.handleRemoveCar());
        this.randomPlateButton.addEventListener('click', () => {
            this.plateInput.value = this.generateRandomPlate();
            this.clearNotice();
        });
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.modalClose.addEventListener('click', () => this.modal.classList.remove('show'));
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement === this.plateInput) {
                if (e.shiftKey) {
                    this.handleRemoveCar();
                } else {
                    this.handleParkCar();
                }
            }
        });
    }

    updateExplanationPane(message) {
        const explanationText = document.getElementById('explanationText');
        explanationText.textContent = message;
    }
}

// Initialize the application
const app = new ParkingGarageUI(); 

function updateNotice(message) {
    const noticeMessage = document.getElementById('noticeMessage');
    if (message) {
        noticeMessage.textContent = message;
    } else {
        noticeMessage.textContent = 'No current notices';
    }
}
