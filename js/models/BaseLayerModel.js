define(['backbone','Cesium','../Util'],function(Backbone,Cesium,Util){
    var BaseLayerModel = Backbone.Model.extend({
        defaults : {
            title : '',
            url : '',
            thumbnail : '',
            name : '',
            type : ''
        },
        initialize : function(){
        	var type = this.get('type');
        	var url = this.get('url');
        	switch(type){
	        	case 'BINGMAP' : this.imageryProvider = new Cesium.BingMapsImageryProvider({
	        		url : url,
	        		key : "ArLWvxLVAh1vxsmDZuOxr94On14sA52a_IPUewEz8H7mm3qDQnjWe-OzJtu1PZpZ"
	        		});break;
	        	case 'TIANDITU' : this.imageryProvider = new Cesium.TiandituImageryProvider();break;
	        	case 'IMAGE' : this.imageryProvider = new Cesium.SingleTileImageryProvider({url : url});break;
	        	case 'OSM' : this.imageryProvider = new Cesium.createOpenStreetMapImageryProvider({url : url});break;
                case 'MAPBOX' : this.imageryProvider = new Cesium.MapboxImageryProvider({mapId: 'mapbox.dark'});break;
                case 'SUPERMAPDARK' : this.imageryProvider = new Cesium.SuperMapImageryProvider({url : url});break;
                case 'SUPERMAPLIGHT' : this.imageryProvider = new Cesium.SuperMapImageryProvider({url : url});break;
                case 'GRIDIMAGERY' :  this.imageryProvider = this.imageryProvider;break;
                default : break;
        	}
        },
        setBaseLayer : function(Cesium,viewer){
        	if(!Cesium || !viewer){
        		return ;
        	}
    		 var imageryLayerCollection = viewer.scene.globe._imageryLayerCollection;
             var layer = imageryLayerCollection.get(0);
            if(imageryLayerCollection.get(2)){
                imageryLayerCollection.remove(imageryLayerCollection.get(2));
            }
            if(imageryLayerCollection.get(1)){
                imageryLayerCollection.remove(imageryLayerCollection.get(1));
            }
            if(this.get('type') != "GRIDIMAGERY"){
                imageryLayerCollection.remove(layer);
                imageryLayerCollection.addImageryProvider(this.imageryProvider, 0);
            }
            if(this.get('type') == "GRIDIMAGERY"){
                imageryLayerCollection.addImageryProvider(new Cesium.TileCoordinatesImageryProvider(),1);
                imageryLayerCollection.addImageryProvider(new Cesium.GridImageryProvider(),2);
            }
        }
    });
    return BaseLayerModel;
});