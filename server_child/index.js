const config = require('./config');
const log = require('./lib/log');

const socketClient = require('socket.io-client');
const http = require('http');

const io = socketClient(config.server.parent_url);

const randomFacts = [
    "Tyrannosaurus: Fierce predator with tiny arms.",
    "Pyramids: Ancient wonders built as tombs for pharaohs.",
    "Nebulas: Vast clouds of gas and dust in deep space.",
    "Stegosaurus: Dinosaur with distinctive plates on its back.",
    "Mayans: Civilization known for impressive temples and pyramids.",
    "Jupiter: Largest planet in our solar system, a gas giant.",
    "Brachiosaurus: Long-necked dinosaur, massive herbivore.",
    "Egyptians: Masters of mummification and ancient architecture.",
    "Asteroids: Small rocky bodies that orbit the Sun in space.",
    "Triceratops: Horned dinosaur, lived during the Cretaceous period.",
    "Sphinx: Mysterious statue guarding the Giza pyramids.",
    "Black holes: Regions of spacetime with strong gravitational pull.",
    "Pterodactyls: Extinct flying reptiles, not dinosaurs technically.",
    "Machu Picchu: Incan citadel in the Andes mountains of Peru.",
    "Saturn: Known for its beautiful and prominent ring system.",
    "Velociraptors: Agile predators with a sickle-shaped claw.",
    "Stonehenge: Prehistoric monument, its purpose remains debated.",
    "Mars: The Red Planet, potentially harboring signs of past life.",
    "Diplodocus: Long-necked dinosaur, one of the longest ever.",
    "Easter Island: Famous for its enigmatic colossal stone statues.",
    "Comets: Icy bodies that produce tails when close to the Sun.",
    "Great Wall: Ancient defensive wall built in China's history.",
    "Galaxies: Vast systems containing billions of stars and planets.",
    "Brontosaurus: Iconic dinosaur, mistakenly merged from fossils.",
    "Cusco: Historic capital of the Incan Empire in Peru.",
    "Astronauts: Brave explorers who journey into outer space.",
    "Archaeopteryx: Early bird species with reptilian features.",
    "Aztecs: Civilization with floating gardens in their capital.",
    "Milky Way: Our galaxy, a vast collection of stars and planets.",
    "Plesiosaurs: Ancient marine reptiles with long necks and flippers."
]

io.on('connect', () => {
    // Connect with parent
    io.emit('parent:init', { id: io.id, secret_code: config.server.secret_code, name: config.server.name });
    io.on('parent:init', data => {
        if (data.type === 'error') return log(`Socket`, `Could not connect to parent server, incorrect secret code`);
        log(`Socket`, `Connected to parent server`);
    });

    io.on('client:request', data => {
        const { id, msg } = data;
    
        io.emit('client:request_response', { id, msg: randomFacts[Math.floor(Math.random() * randomFacts.length)] });
    })
});

io.on('connect_error', () => {
    log(`Error`, `Lost communication with parent`);
});

http.createServer().listen(config.server.port, () => {
    log(`Server`, `Booted up - ${config.server.port}`);
})