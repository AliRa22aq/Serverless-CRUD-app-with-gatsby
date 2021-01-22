var faunadb = require('faunadb'),
  q = faunadb.query;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event) => {

  try {

    const messageBody = JSON.parse(event.body);


    var client = new faunadb.Client({ secret: 'fnAEAGLZuCACDc-_n2VXHLj2Bf-uPA_jq1I9F8jw' });

    var result = await client.query(

      q.Update(
          q.Ref(q.Collection("posts") , messageBody.id), {
            data : {
              update : messageBody.update
            }
          }
        )
    )  

    //const subject = event.queryStringParameters.name || 'World'
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: result.data.detail, update: result.data.update }),

    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}
