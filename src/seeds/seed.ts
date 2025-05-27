import { Capacity } from '../domain/capacity/entities/capacity.entity';
import { Local } from '../domain/local/entities/local.entity';
import { Order } from '../domain/order/entities/order.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'fullfill_iq_db',
  entities: [Local, Order, Capacity],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const localRepo = AppDataSource.getRepository(Local);
  const orderRepo = AppDataSource.getRepository(Order);
  const capacityRepo = AppDataSource.getRepository(Capacity);

  await AppDataSource.query(
    'TRUNCATE TABLE "capacity", "order", "local" CASCADE',
  );

  const local = localRepo.create({
    name: 'Sucursal Central',
    address: 'Av. Siempre Viva 742',
    latitude: -31.4167,
    longitude: -64.1833,
  });

  await localRepo.save(local);

  const orders = orderRepo.create([
    { date: new Date('2024-01-10'), quantity: 5, local },
    { date: new Date('2024-01-11'), quantity: 12, local },
    { date: new Date('2024-01-12'), quantity: 7, local },
  ]);

  await orderRepo.save(orders);

  const capacities = capacityRepo.create([
    {
      date: new Date('2024-01-10'),
      capacity: 10,
      isWeekend: false,
      isHoliday: false,
      promoActive: false,
      local,
    },
    {
      date: new Date('2024-01-11'),
      capacity: 15,
      isWeekend: false,
      isHoliday: false,
      promoActive: true,
      local,
    },
    {
      date: new Date('2024-01-12'),
      capacity: 20,
      isWeekend: true,
      isHoliday: false,
      promoActive: false,
      local,
    },
  ]);

  await capacityRepo.save(capacities);

  console.log('Base de datos poblada correctamente.');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Error al poblar la base de datos:', err);
  process.exit(1);
});
