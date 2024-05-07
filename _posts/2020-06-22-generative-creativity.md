---
layout: post
title:  "Generative Models & Creativity"
date:   2020-06-22 10:01:00 +0100
categories: methods
author:
- Jens Johannsmeier
---

_It's been a while..._

I probably could have kept this post for myself, since the main reason I'm
writing this is to force myself to better formalize and structure these ideas.
But I also wouldn't mind discussing these topics with other people. ;)

This will be a look at **generative models for music** from the perspective of a
deep learning researcher. In particular, I will be taking the standpoint that
such models should aim to possess some sort of creativity: Producing truly
novel and "interesting" artifacts. To put it another way: 
They should model the _process_, not the _data_.
I realize that many of the aspects I bring up are
already being considered and actively researched in other communities (e.g.
computational creativity). However, my main goal is to bring up specifically why
some of the current research directions in deep generative modeling are (IMHO)
misguided and why resources might be better spent on other 
problems.[^1]

[^1]: Besides, including detailed reviews of CC literature would
make this post excessively long.


## Copying Is Not Creativity

Generative modeling may be summarized as: Given a set (or more generally, a 
domain) of data _x_, build a model of the probability distribution _p(x)_. In
fact, most "modern" deep generative modeling frameworks (such as GANs or
VAEs)[^2]
do not actually represent this distribution, focusing instead on producing
_samples_ from _p(x)_. The implications of this (e.g. preventing many potential
applications of a generative model, such as inpainting or density estimation),
while certainly important, are not the topic of this discussion. Instead, I want
to focus on the case where generating outputs is all we care about.

[^2]: Please note, I will not be providing citations for general deep 
learning concepts that I would believe practitioners to be familiar with, nor
a few other things -- I'm a bit lazy and this is not a publication.

While such models are mostly built and tested in the image domain (especially 
faces), attempts at creating music "from nothing" are becoming more ambitious
(e.g. [Music Transformer](https://magenta.tensorflow.org/music-transformer), 
[Musenet](https://openai.com/blog/musenet/), or most recently 
[Jukebox](https://openai.com/blog/jukebox/)). These models are
certainly great accomplishments of engineering, since musical data (especially
on the raw audio level)
is very high-dimensional with dependencies across multiple (and very
long) time spans. But what is their _value_, really? No matter how many layers
 the model
has, how many units per layer, or which fancy connection schemes and training
tricks are used -- at the end of the day, the model will capture statistical
relations between data points, because that's what we ask it to do. Better 
models and/or smart conditioning on factors such as musical style, composers,
lyrics etc. may mask this somewhat, but it doesn't change the fundamental 
nature of these models -- produce things that are like the things they have seen
(or rather, been shown) before. [^3]
The inadequacy of this approach will be  discussed further in the following 
sections, where I will sometimes refer to such models as _copy models_ (please
take this as somewhat tongue-in-cheek).

[^3]: To take a more extreme view: The only
reason these models produce anything "new" is due to limited capacity and
inherent stochasticity of the data. If they could literally copy everything
perfectly, they would.

Please note: I am aware that there are contexts/applications where training a
generative model to "copy" a distribution is actually the goal, and there is
nothing wrong with that. However, models like the ones
mentioned above are usually presented "as is", with their ability to generate an
endless stream of music as the main selling point. Interestingly, they are often
explicitly advertised as generating music "in a certain style", which IMHO masks
their limitations somewhat by pretending that generating hours of Mozart-like
music (for example) is the whole point. Of course, there is some value here --
namely, exploring/showcasing model architectures that are capable of the kind of
long-term structure needed to produce music. I'm certainly not proposing to get
rid of deep models altogether -- their incredible expressiveness should be 
leveraged.
But I believe that at some point,
the relentless scaling-up should be stopped, or at least halted for a bit, and
the insights be applied to more creative approaches to making music. 

As an approach radically different from copy models, it might be possible to 
start [generating artifacts (e.g. pieces of music) without any reference data 
whatsoever](https://neurips2019creativity.github.io/doc/Searching%20for%20an%20(un)stable%20equilibrium_%20experiments%20in%20training%20generative%20models%20without%20data.pdf). This
will likely result in pieces that seem very alien to us, since they are not at
all grounded in our own experience. Still, I believe it could be interesting to
see where, for example, purely information-theoretical approaches could take us.
That is, [art should be predictable (so it is "understandable"), but not too 
predictable, since that would be boring/not stimulating](http://people.idsia.ch/~juergen/creativity.html). The process could
additionally be equipped with simple sensory priors (e.g. related to harmony) to
make the results more familiar. Such models could be used to investigate many
interesting questions, for example: Under which models/assumptions is human-like
music possible to evolve? When adding more assumptions, does it eventually
become inevitable? Speaking of evolution...


## There Is No Goal

Given a fixed data distribution for training, a generative model will be "done"
eventually. That is, it will have converged to the "best" achievable state given
the architecture, data, learning goals, training procedure etc. If we then start
sampling thousands upon thousands of outputs (compositions) from the model,
these will all come from the exact same (albeit possibly extremely complex)
distribution. Diversity can be achieved by using conditional distributions
instead, but these will still be stationary.

It should be clear that this is not a reasonable model of any creative process,
nor will it ever create something truly novel.
On the contrary, such a process should be non-stationary, that is, always
evolving. New genres develop, old ones fall out of favor. Ideas are iterated
upon. New technology becomes available, fundamentally disrupting the "generative
distribution". Such things should (in my opinion) be much more interesting to
model and explore than a literal jukebox.

Concretely, I believe that concepts from research on 
[open-endedness](https://www.oreilly.com/radar/open-endedness-the-last-grand-challenge-youve-never-heard-of/)should be
very interesting to explore here. One example might be co-evolving generators
along with "musical tastes" that can change over time. Speciation could
lead to different genres existing in parallel. A [minimal criterion approach](http://eplex.cs.ucf.edu/papers/brant_gecco17.pdf)
could guarantee that only music that actually has listeners can thrive, while at
the same time making sure that listeners like _something_ instead of just 
rejecting everything for an easy "win". Importantly, this allows for modeling
the apparent subjectivity/taste that plays a big role in human appreciation of
art, without relying on black-box conditioning procedures using opaque latent
codes or similar approaches.

To expand upon the speculation on 
"ex nihilo" generative models at the end of the last section, it could be
interesting to train a copy model to _initialize_ an open-ended search 
process which is then perhaps guided by more general principles/priors. This
would allow for exploring possible evolutions of existent musical genres.


## The Right Level of Modeling

Generative modeling of music is usually done at one of two levels. 

### Symbolic
The first one
is the symbolic level, where music is represented by MIDI, ABC notation, piano
rolls or some other format. What is common to such representations is that they
use (often discrete) "entities" encoding notes or note-like events in terms of
important properties such as the pitch and length of a tone. Importantly, there
is _no_ direct relation to audio in these symbols -- the sequences need to be
interpreted first, e.g. by playing them on some instrument. This implies that
the same MIDI sequence can sound vastly different when it is interpreted via two
different instruments. This is arguably already a problem in itself, since 
widely used symbolic representations lack means of encoding many factors that
are important in contemporary music (electronic music in particular).  
In that
regard, it is quite telling that many symbolic models are trained on classical
(piano) music. Here, the instrument is known and fixed, and so it can be assumed
that a "sensible" sequence of symbols will sound good.[^4]

[^4]: Another reason
for the preference for such data sets is likely that they are widely available
without copyright issues, which is a big problem with musical data. The fact
that they use a single instrument also makes them much more straightforward to
model.

However, there is a second problem related to the interpretation of musical
symbols, which is perhaps easier to miss. Namely, the symbols have **absolutely
no
meaning** by themselves. Previously I said that they usually encode factors such
as the pitch or length of a tone -- but the exact relationships are imposed by
human interpretation. Take the typical western twelve-tone equal temperament 
(which MIDI note pitches are also commonly mapped to) as an example: Here, every
twelve tones
are one octave apart (i.e. they double in fundamental frequency). Seven tones (a
fifth) are in a relation of 3:2, etc. Generally, every tone
increases in frequency by about 6% compared to the next-lower one. Such 
intervals undoubtedly play an important role in human perception of music. But
these relations are completely absent from a symbolic note representation. For a
model training on such data, there might as well be five tones to an octave, or
thirteen, or... The concept of intervals does not arise from symbolic data,
and thus a model trained on such data cannot learn about it.

Then why do such models manage to produce data that sounds "good", with harmonic
intervals we find pleasing? This is simply because the models copy the data they
receive during training. If the data tends to use certain intervals and avoid
 others, the model
will do so, as well. The difference is that the training data was generated 
(i.e. the songs where composed) with a certain symbol-to-sound relationship in
mind (e.g. twelve-tone equal temperament). However, this relationship is lost on
the model, which merely copies what is has been taught without understanding
the ultimate "meaning" (in terms of actual sound). In fact, this seems 
incredibly close to John Searle's famous Chinese Room 
argument.
Thus, unless one wants to view music generation as an exercise in pure symbol
manipulation, the symbolic level seems unfit for any kind of music generation
that is not content with merely copying existing data, although possible
remedies could be to use more expressive symbols that relate more closely to the
audio level (e.g. using frequencies instead of note numbers), or equip the model
with strong priors informed by this relationship.

### Waveform
Aside from the symbolic level, it is also possible to directly generate data
on the audio (waveform) level.[^5] However, this
 approach
has so far been lagging behind symbolic models in terms of structure, coherence
and audio quality. Some models were developed on the single-note level (e.g.
[GANSynth](https://arxiv.org/abs/1902.08710)), with a focus on quality. While 
such models are
interesting for creative applications in human-in-the-loop scenarios (e.g. sound
design), they are obviously not capable of producing interesting musical
_sequences_. Still, there have been examples of modeling sequences in the
 waveform domain with some success (e.g.[DAA](https://arxiv.org/abs/1806.10474)).

[^5]: We can also generate audio at the
spectrogram level. This tends to be easier, but then the problem is how to
invert the spectrograms to audio without loss of quality.

Recently, OpenAI released their [Jukebox model]("https://openai.com/blog/jukebox),
which scaled up waveform
generative models to levels far beyond what has been seen before. The fact that
a single model can produce samples of such variety, conditioned on styles and
even on lyrics, is astounding. However, there are still some issues with
generating at the audio level:
1. Fundamentally, the model still tries to copy the training data.
2. The symbolic level is completely removed. Personally, I don't think this is 
the right approach, either. It means that the model has to essentially discover
concepts such as note events, tempo, rhythm etc. on its own. In a sense, it is
lacking knowledge of how to make sounds, i.e. what instruments are there and how
can they be played. Note that this is likely alleviated by using models such as
VQ-VAEs which at least enforce _some_ kind of discrete representation in the 
hidden space, but these are not necessarily connected to useful/interpretable
musical concepts (certainly not when the model is initialized).
3. As it stands, most waveform generative approaches lack priors regarding the
kind of data they produce, i.e. oscillating waveforms. This means that not only
does the model have to learn what useful "sound sources" would be (see above),
it also needs to learn how sound itself "works", that is, to create oscillations 
at certain frequencies. This causes waveform models to produce audible artifacts
as they struggle to adhere to clean oscillations. A possible remedy for this are
approaches like [DDSP](https://arxiv.org/abs/2001.04643).

### Hybrids
It may be possible to combine symbolic and waveform approaches to achieve the
best of both worlds. Essentially, this means using a symbolic-level model to
produce sequences of symbols, and then a waveform model that translates those
symbols
into sound. This preserves many advantages of symbolic models (e.g. explicit,
interpretable representations and specific ways of making sound) while also 
allowing the model to "connect" with
the domain we eventually care about (audio).

While this sounds good in theory, there are of course problems with this 
approach, too. The main one is probably how to formulate a joint model for
symbols
and sound. A major obstacle here is that it is not possible to backpropagate
through discrete symbols. Since most symbolic models output soft probability
distributions over symbols, this is not a problem in the pure setting. But a
joint model would probably not be able to work with such soft outputs, since it
would be like "pressing every piano key a little bit, but one more than the
others". Still, there are workarounds for this issue, such as vector 
quantization with straight through estimators -- or dropping gradient-based
methods entirely and using alternatives like reinforcement learning or
evolutionary computing instead.

Besides this problem at the symbolic level, there is also one in the
symbol-to-audio pipeline: This generator needs to be differentiable, too. This
means we cannot simply train a symbolic model with a "real" piano (samples),
since the instrument cannot be backpropagated through. Alternatively, using
standard neural network architectures (e.g. Wavenet) can lead to artifacts 
and/or slow generation as discussed before. Personally, I am really interested
in approaches like DDSP that preserve differentiability while incorporating a
sensible inductive bias for audio, leading to much better quality with simpler
models. 

A possible hybrid approach could go like this:

1. Train a DDSP model on instrument samples, say, a piano.
2. Train a symbolic model, but not on a symbolic loss; instead, use the trained
DDSP network to turn the symbols into audio and compute a loss (or some other
target function) on the audio level. Gradients can be backpropagated through
the DDSP model, which should not (need to) be trained anymore, and then through
the symbolic model -- assuming the problem of non-differentiable discrete 
symbols (i.e. the transition between the two levels) can be solved somehow.


## Perception
Colton<dt-cite key="colton"></dt-cite> argues that a creative system needs to 
have three distinct 
properties:
1. Imagination, or the ability to create novel artifacts. Models that learn
and sample from _p(x)_ arguably have this to an extent, in that they can draw
samples that have never been seen before. On the other hand, as argued above,
these models cannot move beyond _p(x)_ and are thus unlikely to produce
something truly _novel_.
2. Skill, or the ability to create quality artifacts. I would argue that this is
the only property that standard data-driven generative models fulfill -- given
that they have enough capacity and are well-trained, outputs can be quite
impressive.
3. Appreciation, or the ability to judge the novelty an quality of their own
creations. 

[Heath & Ventura](http://www.computationalcreativity.net/iccc2016/wp-content/uploads/2016/01/Before-A-Computer-Can-Draw-It-Must-First-Learn-To-See.pdf) argue that this third point is
a key component that is lacking
in many generative systems. We can find analogues, however, in some modeling
frameworks: (Variational) Autoencoders have an inference network (encoder) that
can process data, which would include its own outputs. However, it is not clear
how one would connect this to "appreciation", since the main point of the
encoder usually is to simply map the data to a lower-dimensional representation.
Still, perhaps it could be easier to work in this space than in the data space 
directly.

On the other hand, autoregressive models
as well as flow-based models (which generalize the former) can explicitly
compute probabilities for a given data point, which might be taken as a proxy
for "quality". A model could use this to reject bad samples (e.g. that resulted
from an unfortunate random draw) on its own.
 This is troublesome, however, since it is not clear a priori what
a "high" probability is, and accordingly what kind of score one should strive
for. This is particularly true in the (common) case where the data is treated
as continuous, and the probabilities computed are actually densities. Also, this
approach seems inappropriate for judging novelty -- truly novel work would 
likely receive a low probability and thus be difficult to differentiate from
work that is simply low-quality, which would also receive a low score.

Additionally, none of these models use their "self-judging" abilities to 
actually iterate and improve on their own outputs. This is fairly common in a
creative process: Create something (perhaps only partially), judge which parts
are good/bad and improve on the ones that are lacking. Here, I find 
self-attention approaches such as the transformer interesting: The model can
essentially take multiple turns in creating something, looking at specific parts
of its own output and use this information to iterate further. However,
current transformer models usually do not produce actual outputs (in data space)
 at each 
layer; instead they compute on high-dimensional hidden representations and only
produce an output at the very end.

Given our evolutionary history, I believe it's safe to say that _perception came
first_, and the ability and desire for creativity arose out of these capacities.
At the same time, generative and perceptual processes could also be
tightly interlinked inside a model, e.g. using a predictive coding framework.
At this time, I don't know enough about PC to really make a judgement (or go
into more detail), however.


## Intentionality
Likely the biggest challenge in modeling (human) creativity is that art is 
usually 
"about" something, meaning that it relates in some way to the artist's own
experience in the world. As such, properly approaching this subject seems to
require solving strong AI. However, there may be ways to at least make steps
towards a solution via simpler methods. One example could be multi-modal
representations. As humans, we are able to connect and interrelate perceptions
from different senses, e.g. vision, touch and hearing. We can also relate these
perceptions to memories, abstract concepts, language etc. It seems obvious
that such connections inform many creative artifacts. For example, program music
provides a "soundtrack" that fits a story or series of events. Such music is
neither creatable nor understandable without understanding language/stories
(which in turn requires general world knowledge).
On a more
personal level, an artist may create a piece of music that somehow mirrors a
specific experience, say, "lying at night at the shore of a calm mountain lake".

Models that simply learn to approximate a given data distribution (limited to
the modality of interest) clearly cannot
make such connections.[^6]
However, this could be different for a model that learns
about audio and vision (for example) concurrently. As long as there is some
connection between modalities, e.g. via a shared conceptual space (embeddings
are an extremely popular method and could be a simple way of achieving this to
a first approximation) it
should be possible for the model to connect the visual concepts it is learning
about with the audio dimension. This, like the other proposals in this text, 
is obviously an extremely rough sketch with
many, many details to be considered -- but this requires research, not blog
posts.

[^6]: This would also include the creation of
emotional music; this cannot be created without "knowledge" of emotions. Except,
of course, if the model learns to copy a database of existing emotional 
music -- the common approach.


## Conclusion
To summarize:
- Existing deep generative models mainly aim to copy a given data distribution.
This condemns them to produce artifacts that are "like" the training data in
that they simply follow learned statistical regularities. Data-free models
could instead have the potential to discover truly "new" artifacts from more
general principles.
- Existing models learn a fixed distribution and generally do not evolve beyond 
this, making them "uncreative" by design. Methods from open-endedness research
could result in models that continually push the boundaries of their own
creations.
- Symbolic models are too far removed from the modality of interest (audio) to
be meaningful on their own. Pure waveform models ignore important inductive
biases from how music and sound are created. Hybrid models seem the most
promising, but there are obstacles regarding their implementation and training
with current methods.
- Perception, or the ability for appreciation, is an important aspect of
creativity that is lacking in current models.
- Intentionality is central to art and creativity, but is missing from current
models; nor is it possible to achieve by modeling data distributions in a single
modality.

Each of these points offers several directions for future research to explore.
It is possible that none of these proposed methods/directions will result in
anything comparable to copy models, in terms of surface-level quality, for a
very long time. However, I believe it is important to break the mould of trying
to make progress by throwing humongous amounts of compute at highly complex
data distributions. Instead, generative music (at least for creative purposes)
should start from first principles and accept that the results might be "lame"
for a while. In the long term, this has the potential to teach us about music,
about creativity in general, and about ourselves. Can Jukebox do that?
