import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
import { configure as configureEnzyme } from 'enzyme'
import createChaiEnzyme from 'chai-enzyme'
import createChaiJestDiff from 'chai-jest-diff'
import chaiJestSnapshot from 'chai-jest-snapshot'
import enzymeToJson from 'enzyme-to-json/serializer'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(chaiJestSnapshot)
  .use(createChaiEnzyme())
  .use(sinonChai)

expect.addSnapshotSerializer(enzymeToJson)
configureEnzyme({ adapter: new Adapter() })