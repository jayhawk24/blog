const Blog = require('./models/blog');

const data = [
    {
        title: 'My Favorite Microservice Design Patterns for Node.js',
        author: 'Fernando Doglio',
        image: 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815',
        desc:
            'After working for a while with Node.js I’ve come to the conclusion that there is no better tool to use when writing microservices. Of course, that is my opinion, completely biased by my preference for JavaScript as a language. But hey, even without me pushing my own opinion into your eyes, I bet you can’t say Node.js isn’t a great tool for building microservices. It provides very fast development times, lots of pre-existing frameworks and the async I/O allows for fantastic performance when dealing with a multitude of simultaneous requests. And while Node.js by itself is a great tool, it’s going to come down to however you end up using it. With that in mind, here are some useful and interesting design patterns for your microservices. The idea is that you stop creating a single service for all your projects, there are many ways of splitting them up depending on the type of benefit you’re after. So let’s take a quick look at them.'
    },
    {
        title: 'Why You Should Not Use Classes in JavaScript',
        author: 'David Fekke',
        image: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444',
        desc: `JavaScript is not an Object-Oriented Language

            If you are familiar with the history of JavaScript, Brendan Eich was told that he was going to be able to write a scripting language for the Netscape Navigator to be based on Scheme. Scheme is a functional programming language. Then Eich was told that it had to look similar to Java, hence the name ‘JavaScript’. Oh, by the way, he only had two weeks to get it done.
            
            So JavaScript was never intended to be an object-oriented language. It is actually a prototype-oriented language.
            
            Douglas Crockford likes to joke that most developers who start using JavaScript never bother to actually learn the language first. And if you start looking at the language it has a lot of similiarities to Java and C#. In Java and C# you define classes as a template for a new object. In JavaScript, everything is an object.
            
            Classes were added to JavaScript as a concession for C# and Java developers. Underneath the hood, the JavaScript engines still create objects the same way.`
    },
    {
        title: 'A Mental Trick to Make Any Task Less Intimidating.',
        author: 'Laura Vanderkam',
        image: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265',
        desc: `A few years ago, one of my children became obsessed with roller coasters. He watched video after video to study them from afar. He designed his own in computer games. There was just one problem: He was terrified of actually riding one.

            Eventually, he identified the “Sooper Dooper Looper” at Hersheypark as a potential option: It wasn’t too tall or too fast, and had only one inversion. But when we actually went to the park, he started to lose his nerve. I knew he would regret it if he didn’t ride the roller coaster after all that, so I reminded him that in two minutes, the ride would be over. Even if he hated it, it was only two minutes (1:45, to be exact). I told him to picture himself on the other side of those two minutes.
            
            So he did, and then he rode the coaster. And when it was over, he was really glad he’d tried it. I, meanwhile, was glad that a trick I use often had worked once again. This skill of picturing our future selves is fundamental for discipline — but it’s also important for happiness, which is just as important.`
    }
];

const seedDB = async () => {
    await Blog.insertMany(data);
    console.log('Database seeded');
};

module.exports = seedDB;
