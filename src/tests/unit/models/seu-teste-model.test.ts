import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/carModel';
import MotorcycleModel from '../../../models/motorcycleModel';
import { Model } from 'mongoose';
import mocks from '../mocks';
import { Motorcycle } from '../../../interfaces/motorcycleInterface';

describe('Teste da camada Car Model', () => {
  
  describe('testa a função create Car', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.create as SinonStub).restore()
    })
    
    it('Valida se Car foi criado com sucesso', async () => {
      const carModel = new CarModel();
      const carCreate = await carModel.create(mocks.mockCarBody);
      expect(carCreate).to.be.deep.equal(mocks.mockCar);
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
      const carModel = new CarModel();
      const carFind = await carModel.read();
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
      const carModel = new CarModel();
      const carFind = await carModel.readOne(mocks.mockCarId);
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
      const carModel = new CarModel();
      const carUpdate = await carModel.update(mocks.mockCarId, mocks.mockCar);
      expect(carUpdate).to.be.deep.equal(mocks.mockCar);
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
      const carModel = new CarModel();
      const carDelete = await carModel.delete(mocks.mockCarId);
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
    
    it('Valida se Motorcycle foi criado com sucesso', async () => {
      const motorcycleModel = new MotorcycleModel();
      const motorcycleCreate = await motorcycleModel
        .create(mocks.mockMotorcycleBody as Motorcycle);
      expect(motorcycleCreate).to.be.deep.equal(mocks.mockMotorcycle);
    })
  })

  describe('testa a função find Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([mocks.mockMotorcycle])
    })

    after(() => {
      (Model.find as SinonStub).restore()
    })
    
    it('Valida se busca Motorcycle foi feita com sucesso', async () => {
      const motorcycleModel = new MotorcycleModel();
      const motorcycleFind = await motorcycleModel.read();
      expect(motorcycleFind).to.be.deep.equal([mocks.mockMotorcycle]);
    })
  })

  describe('testa a função findOne Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(mocks.mockMotorcycle)
    })

    after(() => {
      (Model.findOne as SinonStub).restore()
    })
    
    it('Valida se busca por 1 Motorcycle foi feita com sucesso', async () => {
      // const motorcycleModel = new MotorcycleModel();
      // const motorcycleFind = await motorcycleModel.readOne(mocks.mockMotorcycleId);
      // expect(motorcycleFind).to.be.deep.equal(mocks.mockMotorcycle);
    })
  })

  describe('testa a função update Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.mockMotorcycle)
    })

    after(() => {
      (Model.findByIdAndUpdate as SinonStub).restore()
    })
    
    it('Valida se busca por 1 Motorcycle foi feita com sucesso', async () => {
      // const motorcycleModel = new MotorcycleModel();
      // const motorcycleUpdate = await motorcycleModel
      //   .update(mocks.mockMotorcycleId, mocks.mockMotorcycleBody as Motorcycle);
      // expect(motorcycleUpdate).to.be.deep.equal(mocks.mockMotorcycle);
    })
  })

  describe('testa a função delete Motorcycle', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(1)
    })

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore()
    })
    
    it('Valida se busca por 1 Motorcycle foi feita com sucesso', async () => {
      const motorcycleModel = new MotorcycleModel();
      const motorcycleDelete = await motorcycleModel.delete(mocks.mockMotorcycleId);
      expect(motorcycleDelete).to.be.deep.equal(1);
    })
  })
})