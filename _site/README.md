This is a simple documentatio (walkthrough) on how to run this repisotory on your local machine and add new blogposts using the minima blogpost theme.

# minima

*Minima is a one-size-fits-all Jekyll theme for writers*. It's Jekyll's default (and first) theme. It's what you get when you run `jekyll new`.

[Theme preview](https://jekyll.github.io/minima/)

![minima theme preview](/screenshot.png)

# Local deployment
## Prerequisites
Jekyll requires the following:
  - [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.5.0 or higher, including all development headers (check your Ruby version using ruby -v)
  - [RubyGems](https://rubygems.org/pages/download) (check your Gems version using gem -v)
  - [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (check versions using gcc -v,g++ -v, and make -v)


For detailed install instructions, follow the guide for your operating system.
  - [macOS](https://jekyllrb.com/docs/installation/macos/)
  - [Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/)
  - [Other Linux](https://jekyllrb.com/docs/installation/other-linux/)
  - [Windows](https://jekyllrb.com/docs/installation/windows/)


## Installation
Jekyll is a Ruby gem. First, install Ruby on your machine. Follow the instructions for your operating system.

With Ruby installed, install Jekyll from the terminal:
```
gem install jekyll bundler
```

Create a new Gemfile to list your project’s dependencies:
```
bundle init
```

It might be that there exists already a Gemfile. You either remove it and run the command again or just skip the step.

Add the jekyll dependency
```
bundle add jekyll
```
Alternatively, edit the Gemfile in a text editor and add jekyll as a dependency using `gem "Jekyll"`



## Build and serve locally
You can serve the website with

```
bundle exec jekyll serve
```
and visit it at http://127.0.0.1:4000.
From here, you’re ready to continue developing the site on your own. All of the normal Jekyll commands are available to you, but you should prefix them with bundle exec so that Bundler runs the version of Jekyll that is installed in your project folder.

## Adding new Posts
You can easily create and add new posts in the "_posts" folder by creating an .md file while preserving this specific name format:
```
(date-of-the-blog)-(name-of-the-blog).md
```
Example:
```
2021-01-20-my-example-post.md
```

## Post layout
Each new post created must include some settings such as the layout used, title, and the authors.
This settings are added at the begining of the .md file as follows:
```
---
layout: post
title: "This is an example post"
author:
- Bart Simpson
- Nelson Mandela Muntz
---
```
Most of the times the layout for new posts will be "post", users can create new customized layouts in the _layouts folder.

With these settings users are set to create new posts and publish them.
