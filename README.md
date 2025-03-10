Summary/Info:

I am creating a photo sharing app like Instagram or facebook, where the user can sort the posts by newest first or oldest first,
by using sql ORDER BY post_id, asc or desc. If I do asc, the oldest will display first, if I do desc, the newest will display first.

Each picture will have a title, caption and have comments, and an add comment and delete post button. 


Challenges and how i overcame them:

-I had to create a seperate file called actions.js for all my 'use server' functions, because I kept getting mixed up with the client and server functions in the same file. So essentially most of my fetching
and inserting from the database, the functions were in my actions.js file, and I imported them into my client ffunctions when I needed to do onClick / onSubmit etc.

-For CSS, I did a mix of tailwind (for the nav bar and some other minor things), and I created a styles folder in my src, so I could easily import a css file for each page.

-I had a lot of trouble with the SQL queries, probably because I didn't understand it enough. But I persisted and learned from previous code/demos and AI.


🎯 What requirements did you achieve?

All user goals, and for the stretch goals I used some tailwind, I refined the CSS to make it lok professional as I could. 

🎯 Were there any requirements or goals that you were unable to achieve?

Updating the comments/previous posts.

🎯 If so, what was it that you found difficult about these tasks?

I just didn't have the time and energy, in retrospect I couldve used ALTER or UPDATE in sql, and had a button to update the comments based off its ID.


I found this one quite challenging, especially getting used to not having an API or monorepo, but also using the client and server actions was confusing, but I learnt alot 
from debugging and reading the docs.

