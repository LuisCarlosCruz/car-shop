import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../services/carService';
// import MotorcycleService from '../../../services/motorcycleService';
// import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import mocks from '../mocks';
import { Car } from '../../../interfaces/CarInterface';

describe('Teste da camada Car Service', () => {
  
  describe('testa a função create Car', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.create as SinonStub).restore()
    })

    it('Valida se Car foi criado com sucesso', async () => {
      const carService = new CarService();
      const carCreate = await carService.create(mocks.mockCarBody);
      expect(carCreate).to.be.deep.equal(mocks.mockCar);
    })

    it('Valida se houve erro na criação!', async () => {
      const carService = new CarService();
      const carCreate = await carService.create( {} as Car );
      expect(carCreate).to.haveOwnProperty('error');
    })
  })

  describe('testa a função find Car', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([mocks.mockCar])
    })

    after(() => {
      (Model.find as SinonStub).restore()
    })

    it('Valida se busca Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const carFind = await carService.read();
      expect(carFind).to.be.deep.equal([mocks.mockCar]);
    })
  })

  describe('testa a função findOne Car', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.findOne as SinonStub).restore()
    })

    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const carFind = await carService.readOne(mocks.mockCarId);
      expect(carFind).to.be.deep.equal(mocks.mockCar);
    })
  })

  describe('testa a função update Car', () => {
    before(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.findByIdAndUpdate as SinonStub).restore()
    })

    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const carUpdate = await carService.update(mocks.mockCarId, mocks.mockCar);
      expect(carUpdate).to.be.deep.equal(mocks.mockCar);
    })

    it('Valida se houve erro no update!', async () => {
      const carService = new CarService();
      const carCreate = await carService.update(mocks.mockCarId, {} as Car );
      expect(carCreate).to.haveOwnProperty('error');
    })
  })

  describe('testa a função delete Car', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(1)
    })

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore()
    })

    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const carDelete = await carService.delete(mocks.mockCarId);
      expect(carDelete).to.be.deep.equal(1);
    })
  })
})

describe('Teste da camada Motorcycle Model', () => {
  
  describe('testa a função create Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mocks.mockMotorcycle)
    })

    after(() => {
      (Model.create as SinonStub).restore()
    })
    
    // it('Valida se Motorcycle foi criado com sucesso', async () => {
    //   const motorcycleService = new MotorcycleService();
    //   const motorcycleCreate = await motorcycleService
    //     .create(mocks.mockMotorcycleBody as Motorcycle);
    //   expect(motorcycleCreate).to.be.deep.equal(mocks.mockMotorcycle);
    // })

    // it('Valida se houve erro na criação!', async () => {
    //   const motorcycleService = new MotorcycleService();
    //   const motorcycleCreate = await motorcycleService.create( {} as Motorcycle );
    //   expect(motorcycleCreate).to.haveOwnProperty('error');
    // })
  })

  describe('testa a função find Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([mocks.mockMotorcycle])
    })

    after(() => {
      (Model.find as SinonStub).restore()
    })
    
    // it('Valida se busca Motorcycle foi feita com sucesso', async () => {
    //   const motorcycleService = new MotorcycleService();
    //   const motorcycleFind = await motorcycleService.read();
    //   expect(motorcycleFind).to.be.deep.equal([mocks.mockMotorcycle]);
    })
  })

  describe('testa a função findOne Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(mocks.mockMotorcycle)
    })

    after(() => {
      (Model.findOne as SinonStub).restore()
    })
    
    // it('Valida se busca por 1 Motorcycle foi feita com sucesso', async () => {
    //   const motorcycleService = new MotorcycleService();
    //   const motorcycleFind = await motorcycleService.readOne(mocks.mockMotorcycleId);
    //   expect(motorcycleFind).to.be.deep.equal(mocks.mockMotorcycle);
    // })
  })

  describe('testa a função update Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.mockMotorcycle)
    })

    after(() => {
      (Model.findByIdAndUpdate as SinonStub).restore()
    })
    
    // it('Valida se busca por 1 Motorcycle foi feita com sucesso', async () => {
    //   const motorcycleService = new MotorcycleService();
    //   const motorcycleUpdate = await motorcycleService
    //     .update(mocks.mockMotorcycleId, mocks.mockMotorcycleBody as Motorcycle);
    //   expect(motorcycleUpdate).to.be.deep.equal(mocks.mockMotorcycle);
    // })

    // it('Valida se houve erro no update!', async () => {
    //   const motorcycleService = new MotorcycleService();
    //   const motorcycleCreate = await motorcycleService
    //     .update(mocks.mockMotorcycleId, {} as Motorcycle);
    //   expect(motorcycleCreate).to.haveOwnProperty('error');
    // })
  })

  describe('testa a função delete Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(1)
    })

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore()
    })
    
    // it('Valida se busca por 1 Motorcycle foi feita com sucesso', async () => {
    //   const motorcycleService = new MotorcycleService();
    //   const motorcycleDelete = await motorcycleService.delete(mocks.mockMotorcycleId);
    //   expect(motorcycleDelete).to.be.deep.equal(1);
    // })
  })
// })