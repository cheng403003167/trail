module.exports = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Koa Server HTML</title>
        <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
        <script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <div class="contant">
            <div class="row">
                <div class="col-md-8">
                    <h1>Hi <%= you %></h1>
                    <p>This is <%= me %></p>
                </div>
                <div class="col-md-4">
                    <p>测试静态 HTML页面</p>
                </div>
            </div>
        </div>
    </body>
</html>
`