const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

io.on("connection", async (socket) => {
  socket.on("getAllEnquetes", async (msg) => {
    io.emit("getAllEnquetes", await getAllEnquetesJson());
  });
});

io.on("connection", async (socket) => {
  socket.on("createEnquete", async (msg) => {
    await createEnquete(msg);
    io.emit("getAllEnquetes", await getAllEnquetesJson());
  });
});

io.on("connection", async (socket) => {
  socket.on("voteEnqueteSim", async (msg) => {
    await voteEnqueteSim(msg);
    io.emit("getAllEnquetes", await getAllEnquetesJson());
  });
});

io.on("connection", async (socket) => {
  socket.on("voteEnqueteNao", async (msg) => {
    await voteEnqueteNao(msg);
    io.emit("getAllEnquetes", await getAllEnquetesJson());
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});


async function getAllEnquetesJson(){

var enquetesJson;

const data = JSON.stringify({
  query: `query Enquetes {
    enquetes {
      enqueteId
      enqueteNome
      enqueteQuantVotosNao
      enqueteQuantVotosSim
    }
  }`,
});

const options = {
  hostname: 'localhost',
  path: '/',
  port: 4000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'User-Agent': 'Node',
  },
};

const req = http.request(options, (res) => {
  let data = '';
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    data += d;
  });
  res.on('end', () => {
    enquetesJson = JSON.parse(data).data;
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();

await new Promise(resolve => setTimeout(resolve, 5000));

return enquetesJson;

}

async function createEnquete(nomeEnquete){

  
  const data = JSON.stringify({
    query: `mutation Mutation($enqueteNomeInsert: String) {
      addEnquete(enqueteNomeInsert: $enqueteNomeInsert) {
        enqueteId
        enqueteNome
        enqueteQuantVotosNao
        enqueteQuantVotosSim
      }
    }`, variables:{enqueteNomeInsert:nomeEnquete}
  });

  
  const options = {
    hostname: 'localhost',
    path: '/',
    port: 4000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'Node',
    },
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    console.log(`statusCode: ${res.statusCode}`);
  
    res.on('data', (d) => {
      data += d;
    });
    res.on('end', () => {
      console.log(JSON.parse(data).data);
    });
  });
  
  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();

  await new Promise(resolve => setTimeout(resolve, 5000));
  
  
  }




async function voteEnqueteSim(enqueteId){

  const data = JSON.stringify({
    query: `mutation VoteEnquete($idEnquete: String) {
      voteEnqueteSim(idEnquete: $idEnquete) {
        enqueteId
        enqueteNome
        enqueteQuantVotosSim
        enqueteQuantVotosNao
      }
    }`, variables:{idEnquete:enqueteId}
  });
  
  const options = {
    hostname: 'localhost',
    path: '/',
    port: 4000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'Node',
    },
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    console.log(`statusCode: ${res.statusCode}`);
  
    res.on('data', (d) => {
      data += d;
    });
    res.on('end', () => {
      console.log(JSON.parse(data).data);
    });
  });
  
  req.on('error', (error) => {
    console.error(error);
  });
  
  req.write(data);
  req.end();

  await new Promise(resolve => setTimeout(resolve, 5000));
}

async function voteEnqueteNao(enqueteId){

  const data = JSON.stringify({
    query: `mutation VoteEnquete($idEnquete: String) {
      voteEnqueteNao(idEnquete: $idEnquete) {
        enqueteId
        enqueteNome
        enqueteQuantVotosSim
        enqueteQuantVotosNao
      }
    }`, variables:{idEnquete:enqueteId}
  });
  
  const options = {
    hostname: 'localhost',
    path: '/',
    port: 4000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'Node',
    },
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    console.log(`statusCode: ${res.statusCode}`);
  
    res.on('data', (d) => {
      data += d;
    });
    res.on('end', () => {
      console.log(JSON.parse(data).data);
    });
  });
  
  req.on('error', (error) => {
    console.error(error);
  });
  
  req.write(data);
  req.end();

  await new Promise(resolve => setTimeout(resolve, 5000));
}
