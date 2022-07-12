import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const VALUES = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleSchema = z.object({
  category: z.enum(VALUES),
  engineCapacity: z.number().int().min(1).max(2500),
});

type Motorcycle = z.infer<typeof MotorcycleSchema> & Vehicle;

export { Motorcycle, MotorcycleSchema };
