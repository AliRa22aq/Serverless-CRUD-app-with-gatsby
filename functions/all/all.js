var faunadb = require('faunadb'),
  q = faunadb.query;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async () => {

  try {

    var client = new faunadb.Client({ secret: 'fnAEAGLZuCACDc-_n2VXHLj2Bf-uPA_jq1I9F8jw' });

    var result = await client.query(

      q.Map(
        q.Paginate(q.Documents(q.Collection("posts"))),
         q.Lambda(x => q.Get(x))
         )
    )

    //const subject = event.queryStringParameters.name || 'World'
    
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),

    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}
