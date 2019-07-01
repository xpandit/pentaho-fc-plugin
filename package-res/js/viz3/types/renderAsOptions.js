sdefine([
     "pentaho/module!_",
     "pentaho/type/String"
    ], function(module, PenString) {    

        return PenString.extend({
        $type: {
            mixins: ["enum"],
            domain: [
                {v: "-1", f: "None"},
                {v: "0", f: "Measure 1"},
                {v: "1", f: "Measure 2"},
                {v: "2", f: "Measure 3"},
            ]
        }
        }).configure();
});
