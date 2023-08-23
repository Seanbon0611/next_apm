import tracer from 'dd-trace'

const handler = async(req, res) => {
    const span = tracer.scope().active()
      try {
        const response = await fetch("http://localhost:8080")
        const json = await response.json()
        console.log(json)
        res.status(200).send("Success");
      } catch (e) {
        span.setTag("track_error", true)
        span.setTag("error", e)
        res.status(500).send(`There was an Error: ${e}`);
      }
  }
  
  export default handler;