import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Person,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPersonController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Person> {
    return this.pedidoRepository.person(id);
  }
}
