import { sequelize, connectDB } from './config/db.js';
import User from './models/User.js';
import Plant from './models/Plant.js';
import bcryptjs from 'bcryptjs';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Sync database (force: true akan drop dan recreate tables)
    console.log('Syncing database...');
    await sequelize.sync({ force: true });
    console.log('Database synchronized!');

    // Create users
    const hashedPassword = await bcryptjs.hash('password123', 10);

    const users = await User.bulkCreate([
      {
        name: 'Admin User',
        email: 'admin@evergreen.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'Regular User',
        email: 'user@evergreen.com',
        password: hashedPassword,
        role: 'user',
      },
    ]);

    console.log('✓ Users seeded: admin@evergreen.com, user@evergreen.com');

    // Create plants with LOCAL image paths from uploads folder
    const plants = await Plant.bulkCreate([
      // Indoor Plants
      {
        name: 'Monstera Deliciosa',
        latin: 'Monstera deliciosa',
        category: 'indoor',
        description: 'Popular indoor plant with large, fenestrated leaves',
        image: '/uploads/monstera.jpg',
        slug: 'monstera-deliciosa',
      },
      {
        name: 'Snake Plant',
        latin: 'Sansevieria trifasciata',
        category: 'indoor',
        description: 'Hardy, low-maintenance indoor plant',
        image: '/uploads/snake-plant.jpg',
        slug: 'snake-plant',
      },
      {
        name: 'Peace Lily',
        latin: 'Spathiphyllum wallisii',
        category: 'indoor',
        description: 'Elegant flowering indoor plant',
        image: '/uploads/peace-lily.jpg',
        slug: 'peace-lily',
      },
      {
        name: 'Spider Plant',
        latin: 'Chlorophytum comosum',
        category: 'indoor',
        description: 'Easy-to-grow plant with arching green and white leaves',
        image: '/uploads/spider-plant.jpg',
        slug: 'spider-plant',
      },
      {
        name: 'Aglaonema',
        latin: 'Aglaonema commutatum',
        category: 'indoor',
        description: 'Colorful foliage plant, great for low light',
        image: '/uploads/aglaonema.jpg',
        slug: 'aglaonema',
      },

      // Herbal Plants
      {
        name: 'Basil',
        latin: 'Ocimum basilicum',
        category: 'herbal',
        description: 'Fragrant herb used in cooking',
        image: '/uploads/basil.jpg',
        slug: 'basil',
      },
      {
        name: 'Mint',
        latin: 'Mentha piperita',
        category: 'herbal',
        description: 'Refreshing herb, great for tea and cooking',
        image: '/uploads/mint.jpg',
        slug: 'mint',
      },
      {
        name: 'Rosemary',
        latin: 'Rosmarinus officinalis',
        category: 'herbal',
        description: 'Aromatic herb used in Mediterranean cooking',
        image: '/uploads/rosemary.jpg',
        slug: 'rosemary',
      },
      {
        name: 'Lemongrass',
        latin: 'Cymbopogon citratus',
        category: 'herbal',
        description: 'Fragrant herb used in Asian cuisine',
        image: '/uploads/lemongrass.jpg',
        slug: 'lemongrass',
      },
      {
        name: 'Thyme',
        latin: 'Thymus vulgaris',
        category: 'herbal',
        description: 'Small herb used for seasoning and tea',
        image: '/uploads/thyme.jpg',
        slug: 'thyme',
      },
    ]);

    console.log('✓ 10 plants seeded successfully!');
    console.log('\n✅ Seeding completed! 🎉');
    console.log('\nLogin credentials:');
    console.log('Email: admin@evergreen.com');
    console.log('Password: password123');
    console.log('\n📁 Images path: /uploads/[imagename].jpg');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();