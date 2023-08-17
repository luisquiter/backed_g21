from flask_restful import Resource,Api
from flask import request

from .. import api
from ..models import Plato
from ..schemas import PlatoSchema

api_platos = Api(api)

class PlatoResource(Resource):
    
    def get(self):
        data = Plato.query.all()
        data_schema = PlatoSchema(many=True)
        context = {
            'status':True,
            'content':data_schema.dump(data)
        }
        
        return context
    
    def post(self):
        data = request.get_json()
        obj_plato = Plato(data['nombre'])
        if 'precio' in data:
            obj_plato.precio = data['precio']
        if 'imagen' in data:
            obj_plato.imagen = data['imagen']
        obj_plato.save()
        if 'categoria_id' in data:
            obj_plato.categoria_id = data['categoria_id']
        
        data_schema = PlatoSchema()
        
        context = {
            'status':True,
            'content':data_schema.dump(obj_plato)
        }
        
        return context
    
api_platos.add_resource(PlatoResource,'/plato')