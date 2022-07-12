import { expect } from 'chai';
import { Request, Response } from 'express';
import { RequestWithBody, ResponseError } from '../../../controllers';
import sinon, { SinonStub } from 'sinon';
import CarController from '../../../controllers/carController';
import { Car } from '../../../interfaces/CarInterface';
import mocks from '../mocks';
import MotorcycleController from '../../../controllers/motorcyclesController';
import { ZodError } from 'zod';
// import { ServiceError } from '../../../services';
import { Motorcycle } from '../../../interfaces/motorcycleInterface';

const carController = new CarController();
const motorcycleController = new MotorcycleController();

describe('Testa a camada Controller Car', () => {
  describe('Testa a função create', () => {
    describe('Testa se teve sucessso na criação do Car', () => {
      const req = {} as RequestWithBody<Car>
      const res = {} as Response<Car | ResponseError | null>
      before(() => {
        sinon.stub(carController.service, 'create').resolves(mocks.mockCar);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.mockCarBody
      })
    
      after(() => {
        (carController.service.create as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await carController.create(req, res);
        expect((res.status as SinonStub).calledWith(201)).to.be.true;
        expect((res.json as SinonStub).calledWith(mocks.mockCar)).to.be.true;
      });
    });

    describe('Testa se teve erro no corpo da requisição do Car', () => {
      const req = {} as RequestWithBody<Car>
      const res = {} as Response<Car | ResponseError | null>
      before(() => {
        sinon.stub(carController.service, 'create').resolves({ error: {} as ZodError });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = {} as Car
      })
    
      after(() => {
        (carController.service.create as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        await carController.create(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });
    });
  })

  describe('Testa a função read', () => {

    describe('Testa se teve sucessso na busca dos Carros', () => {
      const req = {} as Request
      const res = {} as Response<Car[] | ResponseError>
      before(() => {
        sinon.stub(carController.service, 'read').resolves([mocks.mockCar]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (carController.service.read as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await carController.read(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
        expect((res.json as SinonStub).calledWith([mocks.mockCar])).to.be.true;
      });
    });

    describe('Testa se teve erro da requisição do Car', () => {
      const req = {} as RequestWithBody<Car>
      const res = {} as Response<Car[] | ResponseError>
      before(() => {
        sinon.stub(carController.service, 'read').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (carController.service.read as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await carController.read(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(500)).to.be.true;
        }
      });
    });
  })

  describe('Testa a função readOne', () => {
    
    describe('Testa se teve sucessso na busca por um Carro', () => {
      const req = { params: { id: mocks.mockCarId } } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError | null>
      before(() => {
        sinon.stub(carController.service, 'readOne').resolves(mocks.mockCar);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (carController.service.readOne as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await carController.readOne(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
        expect((res.json as SinonStub).calledWith(mocks.mockCar)).to.be.true;
      });
    });

    describe('Testa se Car não foi encontrado', () => {
      const req = { params: { id: mocks.mockCarId } } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError | null>
      before(() => {
        sinon.stub(carController.service, 'readOne').resolves({ error: 'defaultError'});
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (carController.service.readOne as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        await carController.readOne(req, res);
        expect((res.status as SinonStub).calledWith(404)).to.be.true;
      });
    });

    describe('Testa se teve erro no corpo da requisição do Car', () => {
      const req = { params: { id: mocks.mockCarId } } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError | null>
      before(() => {
        sinon.stub(carController.service, 'readOne').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (carController.service.readOne as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        await carController.readOne(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });
    });
  })

  describe('Testa a função Update', () => {
    
    describe('Testa se teve sucessso na atualização de Car', () => {
      const req = {
        params: { id: mocks.mockCarId }
      } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError | Error | null>
      before(() => {
        sinon.stub(carController.service, 'update').resolves(mocks.mockCar);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.mockCarBody;
      })
    
      after(() => {
        (carController.service.update as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await carController.update(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
        expect((res.json as SinonStub).calledWith(mocks.mockCar)).to.be.true;
      });
    })

    describe('Testa se Car não foi atualizado', () => {
      const req = { params: { id: mocks.mockCarId } } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError | Error | null>
      before(() => {
        sinon.stub(carController.service, 'update').resolves(null);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.mockMotorcycleBodyError
      })
    
      after(() => {
        (carController.service.update as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await carController.update(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(404)).to.be.true;
        }
      });
    });

    describe('Testa se teve erro no corpo da requisição do Car', () => {
      const req = { params: { id: mocks.mockCarId } } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError | Error | null>
      before(() => {
        sinon.stub(carController.service, 'update').resolves({ error: {} as ZodError });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = {} as Car
      })
    
      after(() => {
        (carController.service.update as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        await carController.update(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });
    });
  })

  describe('Testa a função delete', () => {

    describe('Testa se teve sucessso na deleçãp de um Car', () => {
      const req = { params: { id: mocks.mockCarId } } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError>
      before(() => {
        sinon.stub(carController.service, 'delete').resolves(mocks.mockCar);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns(res);
      })
    
      after(() => {
        (carController.service.delete as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await carController.delete(req, res);
        expect((res.status as SinonStub).calledWith(204)).to.be.true;
      });
    });

    describe('Testa se Car não foi deletado', () => {
      const req = { params: { id: mocks.mockCarId } } as Request<{ id: string; }>
      const res = {} as Response<Car | ResponseError | null>
      before(() => {
        sinon.stub(carController.service, 'delete').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (carController.service.delete as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await carController.delete(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(404)).to.be.true;
        }
      });
    });
  });
})

describe('Testa a camada Controller Motorcycle', () => {
  describe('Testa a função create', () => {
    describe('Testa se teve sucessso na criação do Motorcycle', () => {
      const req = {} as RequestWithBody<Motorcycle>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'create')
          .resolves(mocks.mockMotorcycle as Motorcycle);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.mockMotorcycleBody as Motorcycle
      })
    
      after(() => {
        (motorcycleController.service.create as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as SinonStub).calledWith(201)).to.be.true;
        expect((res.json as SinonStub).calledWith(mocks.mockMotorcycle)).to.be.true;
      });
    });

    describe('Testa se teve erro na criação do Motorcycle', () => {
      const req = {} as RequestWithBody<Motorcycle>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'create').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = {} as Motorcycle
      })
    
      after(() => {
        (motorcycleController.service.create as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await motorcycleController.create(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(400)).to.be.true;
        }
      });
    });

    describe('Testa se teve erro no corpo da requisição do Motorcycle', () => {
      const req = {} as RequestWithBody<Motorcycle>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'create').resolves({ error: {} as ZodError });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.mockMotorcycleBodyError as Motorcycle
      })
    
      after(() => {
        (motorcycleController.service.create as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });
    });
  })

  describe('Testa a função read', () => {

    describe('Testa se teve sucessso na busca dos Motorcycles', () => {
      const req = {} as Request
      const res = {} as Response<Motorcycle[] | ResponseError>
      before(() => {
        sinon.stub(motorcycleController.service, 'read')
          .resolves([mocks.mockMotorcycle] as Motorcycle[]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (motorcycleController.service.read as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await motorcycleController.read(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
        expect((res.json as SinonStub).calledWith([mocks.mockMotorcycle])).to.be.true;
      });
    });

    describe('Testa se teve erro da requisição do Motorcycle', () => {
      const req = {} as RequestWithBody<Motorcycle>
      const res = {} as Response<Motorcycle[] | ResponseError>
      before(() => {
        sinon.stub(motorcycleController.service, 'read').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (motorcycleController.service.read as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await motorcycleController.read(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(500)).to.be.true;
        }
      });
    });
  })

  describe('Testa a função readOne', () => {
    
    describe('Testa se teve sucessso na busca por um Motorcycle', () => {
      const req = { params: { id: mocks.mockMotorcycleId } } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError | Error | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'readOne')
          .resolves(mocks.mockMotorcycle as Motorcycle);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (motorcycleController.service.readOne as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
        expect((res.json as SinonStub).calledWith(mocks.mockMotorcycle)).to.be.true;
      });
    });

    describe('Testa se Car não foi encontrado', () => {
      const req = { params: { id: mocks.mockMotorcycleId } } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'readOne').resolves(null);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (motorcycleController.service.readOne as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await motorcycleController.readOne(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(404)).to.be.true;
        }
      });
    });

    describe('Testa se teve erro no corpo da requisição do Motorcycle', () => {
      const req = { params: { id: mocks.mockMotorcycleId } } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'readOne').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (motorcycleController.service.readOne as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });
    });
  })

  describe('Testa a função Update', () => {
    
    describe('Testa se teve sucessso na atualização de Motorcycle', () => {
      const req = {
        params: { id: mocks.mockMotorcycleId }
      } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'update')
          .resolves(mocks.mockMotorcycle as Motorcycle);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.mockMotorcycleBody;
      })
    
      after(() => {
        (motorcycleController.service.update as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
        expect((res.json as SinonStub).calledWith(mocks.mockMotorcycle)).to.be.true;
      });
    })

    describe('Testa se Motorcycle não foi atualizado', () => {
      const req = { params: { id: mocks.mockMotorcycleId } } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'update').resolves(null);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.mockMotorcycleBodyError
      })
    
      after(() => {
        (motorcycleController.service.update as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await motorcycleController.update(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(404)).to.be.true;
        }
      });
    });

    describe('Testa se teve erro no corpo da requisição do Motorcycle', () => {
      const req = { params: { id: mocks.mockMotorcycleId } } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'update').resolves({ error: {} as ZodError });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = {} as Motorcycle
      })
    
      after(() => {
        (motorcycleController.service.update as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });
    });
  })

  describe('Testa a função delete', () => {

    describe('Testa se teve sucessso na deleçãp de um Motorcycle', () => {
      const req = { params: { id: mocks.mockMotorcycleId } } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError>
      before(() => {
        sinon.stub(motorcycleController.service, 'delete')
          .resolves(mocks.mockMotorcycle as Motorcycle);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns(res);
      })
    
      after(() => {
        (motorcycleController.service.delete as SinonStub).restore()
      })
      
      it('Testa se houve sucesso.', async () => {
        await motorcycleController.delete(req, res);
        expect((res.status as SinonStub).calledWith(204)).to.be.true;
      });
    });

    describe('Testa se Motorcycle não foi deletado', () => {
      const req = { params: { id: mocks.mockMotorcycleId } } as Request<{ id: string; }>
      const res = {} as Response<Motorcycle | ResponseError | null>
      before(() => {
        sinon.stub(motorcycleController.service, 'delete').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      })
    
      after(() => {
        (motorcycleController.service.delete as SinonStub).restore()
      })
      
      it('Testa se houve erro.', async () => {
        try {
          await motorcycleController.delete(req, res);
        } catch (error) {
          expect((res.status as SinonStub).calledWith(404)).to.be.true;
        }
      });
    });
  });
})