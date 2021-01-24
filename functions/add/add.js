var faunadb = require('faunadb'),
  q = faunadb.query;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

//  console.log(event)

  try {

    // if (event.httpMethod !== "POST") {
    //   return { statusCode: 405, body: "Method Not Allowed" };
    // }

    const messageBody = JSON.parse(event.body);
    console.log(messageBody)

    var client = new faunadb.Client({ secret: 'fnAEAGLZuCACDc-_n2VXHLj2Bf-uPA_jq1I9F8jw' });


    const result = await client.query(
      q.Create(
        q.Collection('posts'),
        { data: { detail: messageBody.message  } },
      )
    )

    //const subject = event.queryStringParameters.name || 'World'
    
    return {
      statusCode: 200,
      body: JSON.stringify({ detail: result.ref.id}),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}