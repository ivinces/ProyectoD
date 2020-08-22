const  {Client} = require('pg')
const express = require("express");
const { query } = require('express');
const app = express();
app.use(express.json())

const client = new Client({
    user: "agricultor",
    password: "appagricultor",
    host: "localhost",
    port: "5433",
    database: "SensoresDB"
})


//inicio Cultivo
app.get("/cultivo", async (req,res) => {
    const rows = await readRegister("SELECT * FROM Cultivo");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
})
app.post("/cultivo", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await createRegister("INSERT INTO Cultivo (nombre, descripcion, nodo, activo) VALUES ($1,$2,$3, $4)",[reqJson.nombre, reqJson.descripcion, reqJson.nodo, reqJson.activo]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/cultivo", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        await deleteRegister("DELETE FROM Cultivo WHERE id_cultivo = $1", reqJson.id)
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/cultivo", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await updateRegister("UPDATE Cultivo SET nombre = $1, descripcion = $2, nodo = $3, activo = $4 WHERE id_cultivo=$5", [reqJson.nombre, reqJson.descripcion, reqJson.nodo, reqJson.activo, reqJson.id]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})
//fin Cultivo


//inicio Umbrales_Cultivo
app.get("/umbrales_cultivo", async (req,res) => {
    const rows = await readRegister("SELECT * FROM Umbrales_Cultivo");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
})
app.post("/umbrales_cultivo", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await createRegister("INSERT INTO Umbrales_Cultivo (temp_min, temp_max, humedad_min, humedad_max, radiacion_uv_min, radiacion_uv_max, id_cultivo) VALUES ($1,$2,$3,$4,$5,$6,$7)",[reqJson.temp_min, reqJson.temp_max, reqJson.humedad_min, reqJson.humedad_max, reqJson.radiacion_uv_min, reqJson.radiacion_uv_max, reqJson.id_cultivo]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/umbrales_cultivo", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        await deleteRegister("DELETE FROM Umbrales_Cultivo WHERE id_umbrales = $1", reqJson.id)
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/umbrales_cultivo", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await updateRegister("UPDATE Umbrales_Cultivo SET temp_min = $1, temp_max = $2, humedad_min = $3, humedad_max = $4, radiacion_uv_min = $5, radiacion_uv_max = $6, id_cultivo = $7  WHERE id_umbrales=$8",[reqJson.temp_min, reqJson.temp_max, reqJson.humedad_min, reqJson.humedad_max, reqJson.radiacion_uv_min, reqJson.radiacion_uv_max, reqJson.id_cultivo, reqJson.id]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})
//fin Umbrales_Cultivo


//inicio Sensor
app.get("/sensor", async (req,res) => {
    const rows = await readRegister("SELECT * FROM Sensor");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
})
app.post("/sensor", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await createRegister("INSERT INTO Sensor (temperatura, humedad, radiacion, latitud, longitud, id_cultivo) VALUES  ($1,$2,$3,$4,$5,$6)",[reqJson.temperatura, reqJson.humedad, reqJson.radiacion, reqJson.latitud, reqJson.longitud, reqJson.id_cultivo]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/sensor", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        await deleteRegister("DELETE FROM Sensor WHERE id_sensor = $1", reqJson.id)
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/sensor", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await updateRegister("UPDATE Sensor SET temperatura = $1, humedad = $2, radiacion = $3, latitud = $4, longitud = $5, id_cultivo = $6  WHERE id_sensor=$7",[reqJson.temperatura, reqJson.humedad, reqJson.radiacion, reqJson.latitud, reqJson.longitud, reqJson.id_cultivo, reqJson.id]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})
//fin Sensor


//inicio Estado_Sensor
app.get("/estado_sensor", async (req,res) => {
    const rows = await readRegister("SELECT * FROM Estado_Sensor");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
})
app.post("/estado_sensor", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await createRegister("INSERT INTO Estado_Sensor (fecha_hora, bateria, categoria, id_sensor) VALUES ($1,$2,$3,$4)",[reqJson.fecha_hora, reqJson.bateria, reqJson.categoria, reqJson.id_sensor]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/estado_sensor", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        await deleteRegister("DELETE FROM Estado_Sensor WHERE id_estado_sensor = $1", reqJson.id)
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/estado_sensor", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await updateRegister("UPDATE Estado_Sensor SET fecha_hora = $1, bateria = $2, categoria = $3, id_sensor = $4  WHERE id_estado_sensor=$5",[reqJson.fecha_hora, reqJson.bateria, reqJson.categoria, reqJson.id_sensor, reqJson.id]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})
//fin Estado_Sensor


//inicio registro_temperatura
app.get("/registro_temperatura", async (req,res) => {
    const rows = await readRegister("SELECT * FROM registro_temperatura");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
})
app.post("/registro_temperatura", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await createRegister("INSERT INTO registro_temperatura (fecha_hora, valor, id_sensor) VALUES ($1,$2,$3)",[reqJson.fecha_hora, reqJson.valor, reqJson.id_sensor]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/registro_temperatura", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        await deleteRegister("DELETE FROM registro_temperatura WHERE id_reg_temp = $1", reqJson.id)
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/registro_temperatura", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await updateRegister("UPDATE registro_temperatura SET fecha_hora = $1, valor = $2, id_sensor = $3  WHERE id_reg_temp=$4",[reqJson.fecha_hora, reqJson.valor, reqJson.id_sensor, reqJson.id]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})
//fin registro_temperatura


//inicio registro_humedad
app.get("/registro_humedad", async (req,res) => {
    const rows = await readRegister("SELECT * FROM registro_humedad");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
})
app.post("/registro_humedad", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await createRegister("INSERT INTO registro_humedad (fecha_hora, valor, id_sensor) VALUES ($1,$2,$3)",[reqJson.fecha_hora, reqJson.valor, reqJson.id_sensor]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/registro_humedad", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        await deleteRegister("DELETE FROM registro_humedad WHERE id_reg_humedad = $1", reqJson.id)
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/registro_humedad", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await updateRegister("UPDATE registro_humedad SET fecha_hora = $1, valor = $2, id_sensor = $3  WHERE id_reg_humedad=$4",[reqJson.fecha_hora, reqJson.valor, reqJson.id_sensor, reqJson.id]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})
//fin registro_humedad


//inicio registro_humedad
app.get("/registro_radiacion", async (req,res) => {
    const rows = await readRegister("SELECT * FROM registro_radiacion");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
})
app.post("/registro_radiacion", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await createRegister("INSERT INTO registro_radiacion (fecha_hora, valor, id_sensor) VALUES ($1,$2,$3)",[reqJson.fecha_hora, reqJson.valor, reqJson.id_sensor]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/registro_radiacion", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        await deleteRegister("DELETE FROM registro_radiacion WHERE id_reg_radiacion = $1", reqJson.id)
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/registro_radiacion", async (req,res) => {
    let result = {}
    try{
        const reqJson = JSON.parse(req.body.data);
        const rows = await updateRegister("UPDATE registro_radiacion SET fecha_hora = $1, valor = $2, id_sensor = $3  WHERE id_reg_radiacion=$4",[reqJson.fecha_hora, reqJson.valor, reqJson.id_sensor, reqJson.id]);
        result.success=true;
        }
    catch(e){
        result.success = false;
    }
    finally{
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})
//fin registro_radiacion


app.listen(8085, () => console.log("Web server is listening... on port 8085"))


start()
async function start(){
    await connect();
}



//funciones de la base
async function connect() {
    try{
        await client.connect();
    }
    catch(e){
        console.log("Failed to connect "+e)
    }
}

async function readRegister(query){
    try{
        const results = await client.query(query);
        return results.rows;
    }
    catch(e){
        return [];
    }
}

async function createRegister(query, lista){
    try{
        await client.query(query,lista);
        return true
    }
    catch(e){
        return false;
    }
}

async function deleteRegister(query, id){
    try{
        await client.query(query, [id]);
        return true
    }
    catch(e){
        return false;
    }
}

async function updateRegister(query, lista){
    try{
        await client.query(query, lista);
        return true
    }
    catch(e){
        return false;
    }
}

