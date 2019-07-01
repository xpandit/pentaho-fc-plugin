define([
     "pentaho/module!_",
     "pentaho/type/String"
    ], function(module, PenString) {    
        return PenString.extend({
        $type: {
            mixins: ["enum"],
            domain: [
                {v: "none", f: "None"},
                {v: "fint", f: "Fint"},
                {v: "zune", f: "Zune"},
                {v: "ocean", f: "Ocean"},
                {v: "carbon", f: "Carbon"},
                {v: "candy", f: "Candy"},
                {v: "gammel", f: "Gammel"},
                {v: "umber", f: "Umber"},
                {v: "fusion", f: "Fusion"}

            ]
        }
        }).configure();
});
