var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
    // var kittySchema = mongoose.Schema({
    //     name: String
    // });
    // kittySchema.methods.speak = function(){
    //     var greeting = this.name ? "Meow name is " + this.name : 'I don\'t have a name';
    //     console.log(greeting);
    // }
    // var Kitten = mongoose.model('Kitten',kittySchema);
    // var fluffy = new Kitten({name:'fluffy'});
    // fluffy.save((err,fluffy)=>{
    //     if(err) return console.error(err);
    //     fluffy.speak();
    // })
})


