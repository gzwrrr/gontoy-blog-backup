---
title: "Android 自定义 View"
shortTitle: "Android 自定义 View"
description: "Android 自定义 View"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-10-01
category: 
- "Android"
- "移动端"
tag:
- "Android"
- "移动端"
sticky: 1
star: false
article: false
timeline: false
dir:
  text: "Android 自定义 View"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 1
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Android 自定义 View"
  description: "Android 自定义 View"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 自定义 View

[[toc]]



## 写在前面

很多情况下我们的应用都需要支持滑动操作，当处于不同层级的View都可以响应用户的滑动操作时，就会带来一个问题，那就是滑动冲突。

解决冲突需要对View的事件分发机制有一定了解



### 什么是 View

View是Android中所有控件的基类，不管是简单的Button和TextView还是复杂的RelativeLayout和ListView，它们的共同基类都是View。

View是一种界面层的控件的一种抽象，它代表了一个控件。

除了View，还有ViewGroup，从名字来看，它可以被翻译为控件组，言外之意是ViewGroup内部包含了许多个控件，即一组View。

ViewGroup也继承了View，这就意味着View本身就可以是单个控件也可以是由多个控件组成的一组控件，通过这种关系就形成了View树的结构，这和Web前端中的DOM树的概念是相似的。

Button显然是个View，而LinearLayout不但是一个View而且还是一个ViewGroup，而ViewGroup内部是可以有子View的，这个子View同样还可以是ViewGroup，依此类推。





## 基础知识

### View 位置参数

![image-20231014170940996](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231014/view%E4%BD%8D%E7%BD%AE%E5%8F%82%E6%95%B0.png)

View的位置主要由它的四个顶点来决定，分别对应于View的四个属性：top、left、right、bottom，其中top是左上角纵坐标，left是左上角横坐标，right是右下角横坐标，bottom是右下角纵坐标。

这些坐标都是相对于View的父容器来说的，因此它是一种相对坐标。

从Android3.0开始，View增加了额外的几个参数：x、y、translationX和translationY，其中x和y是View左上角的坐标，而translationX和translationY是View左上角相对于父容器的偏移量。

- `x=left+translationX`

- `y=top+translationY`



### MotionEvent

在手指接触屏幕后所产生的一系列事件中，典型的事件类型有如下几种：

- `ACTION_DOWN`：手指刚接触屏幕

- `ACTION_MOVE`：手指在屏幕上移动

- `ACTION_UP`：手机从屏幕上松开的一瞬间

时通过MotionEvent对象我们可以得到点击事件发生的x和y坐标。系统提供了两组方法：getX/getY和getRawX/getRawY。getX/getY返回的是相对于当前View左上角的x和y坐标，而getRawX/getRawY返回的是相对于手机屏幕左上角的x和y坐标。



### TouchSlop

TouchSlop是系统所能识别出的被认为是滑动的最小距离，换句话说，当手指在屏幕上滑动时，如果两次滑动之间的距离小于这个常量，那么系统就不认为你是在进行滑动操作。

通过如下方式即可获取这个常量：`ViewConfiguration. get(getContext()).getScaledTouchSlop()`。

当我们在处理滑动时，可以利用这个常量来做一些过滤，比如当两次滑动事件的滑动距离小于这个值，我们就可以认为未达到滑动距离的临界值，因此就可以认为它们不是滑动，这样做可以有更好的用户体验。

其实如果细心的话，可以在源码中找到这个常量的定义，在`frameworks/base/core/res/res/values/config.xml`文件中，如下所示。这个`config_viewConfigurationTouchSlop`对应的就是这个常量的定义。





### VelocityTracker

> 速度 = （终点位置 - 起点位置）/ 时间段

VelocityTracker：速度追踪，用于追踪手指在滑动过程中的速度，包括水平和竖直方向的速度。

**注意点：**

1. 获取速度之前必须先计算速度，即getXVelocity和getYVelocity这两个方法的前面必须要调用computeCurrentVelocity方法。
2. 这里的速度是指一段时间内手指所滑过的像素数，比如将时间间隔设为1000ms时，在1s内，手指在水平方向从左向右滑过100像素，那么水平速度就是100。
3. 速度可以为负数，当手指从右往左滑动时，水平方向速度即为负值。



### GestureDetector

GestureDetector：手势检测，用于辅助检测用户的单击、滑动、长按、双击等行为。

| 方法名                 | 描述                                                         | 所属接口              |
| ---------------------- | ------------------------------------------------------------ | --------------------- |
| `onDown`               | 手指轻轻触摸屏幕的一瞬间，由一个`ACTION_DOWN`触发            | `OnGestureListener`   |
| `onShowPress`          | 手指轻轻触摸屏幕，尚未松开或拖动，由一个`ACTION_DOWN`触发    | `OnGestureListener`   |
| `onSingleTapUp`        | 手指轻轻触摸屏幕后松开，伴随着一个`ACTION_UP`而触发          | `OnGestureListener`   |
| `onScroll`             | 手指按下屏幕并拖动，由一个`ACTION_DOWN`和多个`ACTION_MOVE`触发 | `OnGestureListener`   |
| `onLongPress`          | 用户长久地按住屏幕不放                                       | `OnGestureListener`   |
| `onFling`              | 用户按下触摸屏、快速滑动后松开，由一个`ACTION_DOWN`、多个`ACTION_MOVE`、一个`ACTION_UP`触发，是快速滑动行为 | `OnGestureListener`   |
| `onDoubleTap`          | 双击，不可能和`onSingleTapConfirmed`共存                     | `OnDoubleTapListener` |
| `onSingleTapConfirmed` | 严格的单击行为                                               | `OnDoubleTapListener` |
| `onDoubleTapEvent`     | 表示发生了双击行为，双击期间`ACTION_DOWN`、`ACTION_MOVE`、`ACTION_UP`都会触发此回调 | `OnDoubleTapListener` |

实际开发中，可以不使用GestureDetector，完全可以自己在View的`onTouchEvent`方法中实现所需的监听。如果只是监听滑动相关的，建议自己在`onTouchEvent`中实现，如果要监听双击这种行为的话，那么就使用GestureDetector。



### Scroller

Scroller：弹性滑动对象，用于实现View的弹性滑动。当使用View的scrollTo/scrollBy方法来进行滑动时，其过程是瞬间完成的，这个没有过渡效果的滑动用户体验不好。这个时候就可以使用Scroller来实现有过渡效果的滑动，其过程不是瞬间完成的，而是在一定的时间间隔内完成的。

Scroller本身无法让View弹性滑动，它需要和View的computeScroll方法配合使用才能共同完成这个功能。





## View 的滑动

在Android设备上，滑动几乎是应用的标配，不管是下拉刷新还是SlidingMenu，它们的基础都是滑动。

从另外一方面来说，Android手机由于屏幕比较小，为了给用户呈现更多的内容，就需要使用滑动来隐藏和显示一些内容。

**通过三种方式可以实现View的滑动：**

1. 通过View本身提供的`scrollTo/scrollBy`方法来实现滑动
2. 通过动画给View施加平移效果来实现滑动
3. 通过改变View的LayoutParams使得View重新布局从而实现滑动

**优缺点：**

- scrollTo/scrollBy：它是View提供的原生方法，其作用是专门用于View的滑动，它可以比较方便地实现滑动效果并且不影响内部元素的单击事件。但是它的缺点也是很显然的：它只能滑动View的内容，并不能滑动View本身。

- 动画：如果是Android 3.0以上并采用属性动画，那么采用这种方式没有明显的缺点；如果是使用View动画或者在Android 3.0以下使用属性动画，均不能改变View本身的属性。在实际使用中，如果动画元素不需要响应用户的交互，那么使用动画来做滑动是比较合适的，否则就不太适合。但是动画有一个很明显的优点，那就是一些复杂的效果必须要通过动画才能实现。

- 改变布局：除了使用起来麻烦点以外，也没有明显的缺点，它的主要适用对象是一些具有交互性的View，因为这些View需要和用户交互，直接通过动画去实现会有问题。

**总结：**

- scrollTo/scrollBy：操作简单，适合对View内容的滑动。
- 动画：操作简单，主要适用于没有交互的View和实现复杂的动画效果。
- 改变布局参数：操作稍微复杂，适用于有交互的View。





## 弹性滑动



### 使用 Scroller

> 将一次大的滑动分成若干次小的滑动并在一个时间段内完成，弹性滑动的具体实现方式有很多，比如通过Scroller、Handler#postDelayed以及Thread#sleep等。

```java
public void startScroll(int startX,int startY,int dx,int dy,int duration){
    mMode = SCROLL_MODE;
    mFinished = false;
    mDuration = duration;
    mStartTime = AnimationUtils.currentAnimationTimeMillis();
    mStartX = startX;
    mStartY = startY;
    mFinalX = startX + dx;
    mFinalY = startY + dy;
    mDeltaX = dx;
    mDeltaY = dy;
    mDurationReciprocal = 1.0f / (float) mDuration;
}
```

- 这个方法的参数含义很清楚，startX和startY表示的是滑动的起点，dx和dy表示的是要滑动的距离，而duration表示的是滑动时间，即整个滑动过程完成所需要的时间，注意这里的滑动是指View内容的滑动而非View本身位置的改变。
- 仅仅调用`startScroll`方法是无法让View滑动的，因为它内部并没有做滑动相关的事，需要使用`invalidate`方法才可能滑动
- `invalidate`方法会导致View重绘，在View的`draw`方法中又会去调用`computeScroll`方法，`computeScroll`方法在View中是一个空实现，因此需要我们自己去实现，上面的代码已经实现了`computeScroll`方法。正是因为这个computeScroll方法，View才能实现弹性滑动。
- 当View重绘后会在`draw`方法中调用`computeScroll`，而`computeScroll`又会去向Scroller获取当前的`scrollX`和`scrollY`；然后通过`scrollTo`方法实现滑动；接着又调用`postInvalidate`方法来进行第二次重绘，这一次重绘的过程和第一次重绘一样，还是会导致`computeScroll`方法被调用；然后继续向Scroller获取当前的`scrollX`和`scrollY`，并通过`scrollTo`方法滑动到新的位置，如此反复，直到整个滑动过程结束。

> Scroller的设计思想是多么值得称赞，整个过程中它对View没有丝毫的引用，甚至在它内部连计时器都没有。

Scroller本身并不能实现View的滑动，它需要配合View的`computeScroll`方法才能完成弹性滑动的效果，它不断地让View重绘，而每一次重绘距滑动起始时间会有一个时间间隔，通过这个时间间隔Scroller就可以得出View当前的滑动位置，知道了滑动位置就可以通过`scrollTo`方法来完成View的滑动。就这样，View的每一次重绘都会导致View进行小幅度的滑动，而多次的小幅度滑动就组成了弹性滑动，这就是Scroller的工作机制。



### 使用动画

动画本身就是一种渐近的过程，因此通过它来实现的滑动天然就具有弹性效果。

```java
final int startX = 0;
final int deltaX = 100;
ValueAnimator animator = ValueAnimator.ofInt(0,1).setDuration(1000);

animator.addUpdateListener(new AnimatorUpdateListener() {
    @Override
    public void onAnimationUpdate(ValueAnimator animator) {
        float fraction = animator.getAnimatedFraction();
        mButton1.scrollTo(startX + (int) (deltaX * fraction),0);
    }
});

animator.start();
```

在上述代码中，我们的动画本质上没有作用于任何对象上，它只是在1000ms内完成了整个动画过程。利用这个特性，我们就可以在动画的每一帧到来时获取动画完成的比例，然后再根据这个比例计算出当前View所要滑动的距离。注意，这里的滑动针对的是View的内容而非View本身。可以发现，这个方法的思想其实和Scroller比较类似，都是通过改变一个百分比配合scrollTo方法来完成View的滑动。需要说明一点，采用这种方法除了能够完成弹性滑动以外，还可以实现其他动画效果，我们完全可以在onAnimationUpdate方法中加上我们想要的其他操作。



### 使用延时策略

核心思想是通过发送一系列延时消息从而达到一种渐近式的效果，具体来说可以使用Handler或View的postDelayed方法，也可以使用线程的sleep方法。

对于postDelayed方法来说，我们可以通过它来延时发送一个消息，然后在消息中来进行View的滑动，如果接连不断地发送这种延时消息，那么就可以实现弹性滑动的效果。

对于sleep方法来说，通过在while循环中不断地滑动View和sleep，就可以实现弹性滑动的效果。





## 事件分发机制

> 滑动冲突的解决方法的理论基础就是事件分发机制，因此掌握好View的事件分发机制是十分重要的。



### 点击事件传递规则

分析的对象就是MotionEvent，即点击事件。

所谓点击事件的事件分发，其实就是对MotionEvent事件的分发过程，即当一个MotionEvent产生了以后，系统需要把这个事件传递给一个具体的View，而这个传递的过程就是分发过程。

点击事件的分发过程由三个很重要的方法来共同完成：

1. `dispatchTouchEvent`：用来进行事件的分发。如果事件能够传递给当前View，那么此方法一定会被调用，返回结果受当前View的`onTouchEvent`和下级View的`dispatchTouchEvent`方法的影响，表示是否消耗当前事件。
2. `onInterceptTouchEvent`：用来判断是否拦截某个事件，如果当前View拦截了某个事件，那么在同一个事件序列当中，此方法不会被再次调用，返回结果表示是否拦截当前事件。
3. `onTouchEven`：在dispatchTouchEvent方法中调用，用来处理点击事件，返回结果表示是否消耗当前事件，如果不消耗，则在同一个事件序列中，当前View无法再次接收到事件。

```java
public boolean dispatchTouchEvent(MotionEvent ev) {
    boolean consume = false;
    if (onInterceptTouchEvent(ev)) {
    	consume = onTouchEvent(ev);
    } else {
 	    consume = child.dispatchTouchEvent(ev);
    }
    return consume;
}
```

点击事件的传递规则：对于一个根ViewGroup来说，点击事件产生后，首先会传递给它，这时它的`dispatchTouchEvent`就会被调用，如果这个ViewGroup的`onInterceptTouchEvent`方法返回true就表示它要拦截当前事件，接着事件就会交给这个ViewGroup处理，即它的`onTouchEvent`方法就会被调用；如果这个ViewGroup的`onInterceptTouchEvent`方法返回false就表示它不拦截当前事件，这时当前事件就会继续传递给它的子元素，接着子元素的`dispatchTouchEvent`方法就会被调用，如此反复直到事件被最终处理。

当一个View需要处理事件时，如果它设置了`OnTouchListener`，那么`OnTouchListener`中的`onTouch`方法会被回调。这时事件如何处理还要看`onTouch`的返回值，如果返回false，则当前View的`onTouchEvent`方法会被调用；如果返回true，那么`onTouchEvent`方法将不会被调用。由此可见，给View设置的`OnTouchListener`，其优先级比`onTouchEvent`要高。

在`onTouchEvent`方法中，如果当前设置的有`OnClickListener`，那么它的`onClick`方法会被调用。可以看出，平时我们常用的`OnClickListener`，其优先级最低，即处于事件传递的尾端。



当一个点击事件产生后，它的传递过程遵循如下顺序：Activity -> Window -> View。顶级View接收到事件后，就会按照事件分发机制去分发事件。

如果一个View的onTouchEvent返回false，那么它的父容器的onTouchEvent将会被调用，依此类推。如果所有的元素都不处理这个事件，那么这个事件将会最终传递给Activity处理，即Activity的onTouchEvent方法会被调用（类似双亲委派）



关于事件传递的机制，这里给出一些结论：

1. 同一个事件序列是指从手指接触屏幕的那一刻起，到手指离开屏幕的那一刻结束，在这个过程中所产生的一系列事件，这个事件序列以`down`事件开始，中间含有数量不定的`move`事件，最终以`up`事件结束。
2. 正常情况下，一个事件序列只能被一个View拦截且消耗，因为一旦一个元素拦截了某此事件，那么同一个事件序列内的所有事件都会直接交给它处理，因此同一个事件序列中的事件不能分别由两个View同时处理，但是通过特殊手段可以做到，比如一个View将本该自己处理的事件通过`onTouchEvent`强行传递给其他View处理。
3. 某个View一旦决定拦截，那么这一个事件序列都只能由它来处理（如果事件序列能够传递给它的话），并且它的`onInterceptTouchEvent`不会再被调用。这条也很好理解，就是说当一个View决定拦截一个事件后，那么系统会把同一个事件序列内的其他方法都直接交给它来处理，因此就不用再调用这个View的`onInterceptTouchEvent`去询问它是否要拦截了。
4. 某个View一旦开始处理事件，如果它不消耗`ACTION_DOWN`事件（`onTouchEvent`返回了false），那么同一事件序列中的其他事件都不会再交给它来处理，并且事件将重新交由它的父元素去处理，即父元素的`onTouchEvent`会被调用。意思就是事件一旦交给一个View处理，那么它就必须消耗掉，否则同一事件序列中剩下的事件就不再交给它来处理了。
5. 如果View不消耗除`ACTION_DOWN`以外的其他事件，那么这个点击事件会消失，此时父元素的`onTouchEvent`并不会被调用，并且当前View可以持续收到后续的事件，最终这些消失的点击事件会传递给Activity处理。
6. ViewGroup默认不拦截任何事件。Android源码中ViewGroup的`onInterceptTouch-Event`方法默认返回false。
7. View没有`onInterceptTouchEvent`方法，一旦有点击事件传递给它，那么它的`onTouchEvent`方法就会被调用。
8. View的`onTouchEvent`默认都会消耗事件（返回true），除非它是不可点击的（`clickable `和`longClickable`同时为false）。View的`longClickable`属性默认都为false，`clickable`属性要分情况，比如Button的`clickable`属性默认为true，而TextView的`clickable`属性默认为false。
9. View的`enable`属性不影响`onTouchEvent`的默认返回值。哪怕一个View是`disable`状态的，只要它的`clickable`或者`longClickable`有一个为true，那么它的`onTouchEvent`就返回true。
10. `onClick`会发生的前提是当前View是可点击的，并且它收到了`down`和`up`的事件。
11. 事件传递过程是由外向内的，即事件总是先传递给父元素，然后再由父元素分发给子View，通过`requestDisallowInterceptTouchEvent`方法可以在子元素中干预父元素的事件分发过程，但是`ACTION_DOWN`事件除外。







## 滑动冲突

常见的三种场景：

1. 场景1：外部滑动方向和内部滑动方向不一致。

   主要是将ViewPager和Fragment配合使用所组成的页面滑动效果，主流应用几乎都会使用这个效果。在这种效果中，可以通过左右滑动来切换页面，而每个页面内部往往又是一个ListView。本来这种情况下是有滑动冲突的，但是ViewPager内部处理了这种滑动冲突，因此采用ViewPager时我们无须关注这个问题，如果我们采用的不是ViewPager而是ScrollView等，那就必须手动处理滑动冲突了，否则造成的后果就是内外两层只能有一层能够滑动，这是因为两者之间的滑动事件有冲突。除了这种典型情况外，还存在其他情况，比如外部上下滑动、内部左右滑动等，但是它们属于同一类滑动冲突。

2. 场景2：外部滑动方向和内部滑动方向一致。

   当内外两层都在同一个方向可以滑动的时候，显然存在逻辑问题。因为当手指开始滑动的时候，系统无法知道用户到底是想让哪一层滑动，所以当手指滑动的时候就会出现问题，要么只有一层能滑动，要么就是内外两层都滑动得很卡顿。在实际的开发中，这种场景主要是指内外两层同时能上下滑动或者内外两层同时能左右滑动。

3. 场景3：上面两种情况的嵌套。

   外部有一个SlideMenu效果，然后内部有一个ViewPager，ViewPager的每一个页面中又是一个ListView。虽然说场景3的滑动冲突看起来更复杂，但是它是几个单一的滑动冲突的叠加，因此只需要分别处理内层和中层、中层和外层之间的滑动冲突即可，而具体的处理方法其实是和场景1、场景2相同的。





### 处理规则

> 可以分为外部拦截法和内部拦截法

一般来说，不管滑动冲突多么复杂，它都有既定的规则，根据这些规则我们就可以选择合适的方法去处理。



对于场景1，它的处理规则是：当用户左右滑动时，需要让外部的View拦截点击事件，当用户上下滑动时，需要让内部View拦截点击事件。

这个时候我们就可以根据它们的特征来解决滑动冲突，具体来说是：根据滑动是水平滑动还是竖直滑动来判断到底由谁来拦截事件。根据滑动过程中两个点之间的坐标就可以得出到底是水平滑动还是竖直滑动。

可以依据滑动路径和水平方向所形成的夹角，也可以依据水平方向和竖直方向上的距离差来判断，某些特殊时候还可以依据水平和竖直方向的速度差来做判断。



对于场景2来说，比较特殊，它无法根据滑动的角度、距离差以及速度差来做判断，但是这个时候一般都能在业务上找到突破点，比如业务上有规定：当处于某种状态时需要外部View响应用户的滑动，而处于另外一种状态时则需要内部View来响应View的滑动，根据这种业务上的需求我们也能得出相应的处理规则，有了处理规则同样可以进行下一步处理。





## ViewRoot

:::warning 注意

- 为了更好地自定义View，还需要掌握View的底层工作原理，比如：View的测量流程、布局流程、绘制流程，掌握这几个基本流程后，我们就对View的底层更加了解，这样我们就可以做出一个比较完善的自定义View。

- 除了View的三大流程以外，View常见的回调方法也是需要熟练掌握的，比如构造方法、onAttach、onVisibilityChanged、onDetach等。另外对于一些具有滑动效果的自定义View，我们还需要处理View的滑动，如果遇到滑动冲突就还需要解决相应的滑动冲突。
- 总结来说，自定义View是有几种固定类型的，有的直接继承自View和ViewGroup，而有的则选择继承现有的系统控件，这些都可以，关键是要选择最适合当前需要的方式，选对自定义View的实现方式可以起到事半功倍的效果。

:::

- ViewRoot对应于ViewRootImpl类，它是连接WindowManager和DecorView的纽带，View的三大流程均是通过ViewRoot来完成的。

- 在ActivityThread中，当Activity对象被创建完毕后，会将DecorView添加到Window中，同时会创建ViewRootImpl对象，并将ViewRootImpl对象和DecorView建立关联。

- View的绘制流程是从ViewRoot的performTraversals方法开始的，它经过measure、layout和draw三个过程才能最终将一个View绘制出来，其中measure用来测量View的宽和高，layout用来确定View在父容器中的放置位置，而draw则负责将View绘制在屏幕上。

![image-20231015163539705](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231015/%E8%87%AA%E5%AE%9A%E4%B9%89view%E7%BB%98%E5%88%B6%E6%B5%81%E7%A8%8B.png)

- DecorView作为顶级View，一般情况下它内部会包含一个竖直方向的LinearLayout，在这个LinearLayout里面有上下两个部分（具体情况和Android版本及主题有关），上面是标题栏，下面是内容栏。

- 在Activity中我们通过setContentView所设置的布局文件其实就是被加到内容栏之中的，而内容栏的id是content，因此可以理解为Activity指定布局的方法不叫setview而叫setContentView，因为我们的布局的确加到了id为content的FrameLayout中。

- 同时，通过源码我们可以知道，DecorView其实是一个FrameLayout，View层的事件都先经过DecorView，然后才传递给我们的View。





### MeasureSpec

- 为了更好地理解View的测量过程，我们还需要理解MeasureSpec。MeasureSpec看起来像“测量规格”或者“测量说明书”，不管怎么翻译，它看起来都好像是或多或少地决定了View的测量过程。

- 在测量过程中，系统会将View的LayoutParams根据父容器所施加的规则转换成对应的MeasureSpec，然后再根据这个measureSpec来测量出View的宽/高。

- 这里的宽/高是测量宽/高，不一定等于View的最终宽/高。

MeasureSpec代表一个32位int值：

- 高2位代表`SpecMode`：测量模式
  1. `UNSPECIFIED`：父容器不对View有任何限制，要多大给多大，这种情况一般用于系统内部，表示一种测量的状态。
  2. `EXACTLY`：父容器已经检测出View所需要的精确大小，这个时候View的最终大小就是SpecSize所指定的值。它对应于LayoutParams中的match_parent和具体的数值这两种模式。
  3. `AT_MOST`：父容器指定了一个可用大小即SpecSize，View的大小不能大于这个值，具体是什么值要看不同View的具体实现。它对应于LayoutParams中的wrap_content。
- 低30位代表`SpecSize`：在某种测量模式下的规格大小





### LayoutParams

- 系统内部是通过MeasureSpec来进行View的测量，但是正常情况下我们使用View指定MeasureSpec，尽管如此，但是我们可以给View设置LayoutParams。
- 在View测量的时候，系统会将LayoutParams在父容器的约束下转换成对应的MeasureSpec，然后再根据这个MeasureSpec来确定View测量后的宽/高。
- 注意：MeasureSpec不是唯一由LayoutParams决定的，LayoutParams需要和父容器一起才能决定View的MeasureSpec，从而进一步决定View的宽/高。

对于顶级View（即DecorView）和普通View来说，MeasureSpec的转换过程略有不同：

- 对于DecorView，其MeasureSpec由窗口的尺寸和其自身的LayoutParams来共同确定。
- 对于普通View，其MeasureSpec由父容器的MeasureSpec和自身的LayoutParams来共同决定，MeasureSpec一旦确定后，onMeasure中就可以确定View的测量宽/高。

```java
private static int getRootMeasureSpec(int windowSize,int rootDimension) {
	int measureSpec;
    switch (rootDimension) {
        case ViewGroup.LayoutParams.MATCH_PARENT:
            // Window can't resize. Force root view to be windowSize.
            measureSpec = MeasureSpec.makeMeasureSpec(windowSize,MeasureSpec.EXACTLY);
       		break;
        case ViewGroup.LayoutParams.WRAP_CONTENT:
            // Window can resize. Set max size for root view.
            measureSpec = MeasureSpec.makeMeasureSpec(windowSize,MeasureSpec.AT_MOST);
            break;
        default:
            // Window wants to be an exact size. Force root view to be that size.
            measureSpec = MeasureSpec.makeMeasureSpec(rootDimension,Measure-Spec.EXACTLY);
            break;
    }
	return measureSpec;
}
```

通过上述代码，DecorView的MeasureSpec的产生过程就很明确了，具体来说其遵守如下规则，根据它的LayoutParams中的宽/高的参数来划分：

- `LayoutParams.MATCH_PARENT`：精确模式，大小就是窗口的大小。

- `LayoutParams.WRAP_CONTENT`：最大模式，大小不定，但是不能超过窗口的大小。

- 固定大小（比如100dp）：精确模式，大小为LayoutParams中指定的大小。

对于普通View来说，这里是指我们布局中的View，View的measure过程由ViewGroup传递而来：

```java
protected void measureChildWithMargins(View child, 
    int parentWidthMeasureSpec,int widthUsed,
    int parentHeightMeasureSpec,int heightUsed) {
    
    final MarginLayoutParams lp = (MarginLayoutParams) child.getLayout-Params();
    final int childWidthMeasureSpec = getChildMeasureSpec(
        parentWidthMeasureSpec,mPaddingLeft + mPaddingRight + lp.leftMargin + lp.rightMargin + widthUsed,lp.width);
    final int childHeightMeasureSpec = getChildMeasureSpec(
        parentHeight-MeasureSpec,mPaddingTop + mPaddingBottom + lp.topMargin + lp.bottomMargin + heightUsed,lp.height);
    child.measure(childWidthMeasureSpec,childHeightMeasureSpec);

}
```

可以发现：在调用子元素的measure方法之前会先通过getChildMeasureSpec方法来得到子元素的MeasureSpec。

对于普通View，其MeasureSpec由父容器的MeasureSpec和自身的LayoutParams来共同决定，那么针对不同的父容器和View本身不同的LayoutParams，View就可以有多种MeasureSpec。

- 当View采用固定宽/高的时候，不管父容器的MeasureSpec是什么，View的MeasureSpec都是精确模式并且其大小遵循Layoutparams中的大小。

- 当View的宽/高是match_parent时，如果父容器的模式是精准模式，那么View也是精准模式并且其大小是父容器的剩余空间。

- 如果父容器是最大模式，那么View也是最大模式并且其大小不会超过父容器的剩余空间。
- 当View的宽/高是wrap_content时，不管父容器的模式是精准还是最大化，View的模式总是最大化并且大小不能超过父容器的剩余空间。

注意：`UNSPECIFIED`模式主要用于系统内部多次Measure的情形，一般来说，我们不需要关注此模式。

可以发现：只要提供父容器的MeasureSpec和子元素的LayoutParams，就可以快速地确定出子元素的MeasureSpec了，有了MeasureSpec就可以进一步确定出子元素测量后的大小了。





## View 工作流程



### measure 过程

measure过程要分情况来看：

- 如果只是一个原始的View，那么通过measure方法就完成了其测量过程。
- 如果是一个ViewGroup，除了完成自己的测量过程外，还会遍历去调用所有子元素的measure方法，各个子元素再递归去执行这个流程。

在onCreate、onStart、onResume中均无法正确得到某个View的宽/高信息，这是因为View的measure过程和Activity的生命周期方法不是同步执行的，因此无法保证Activity执行了onCreate、onStart、onResume时某个View已经测量完毕了，如果View还没有测量完毕，那么获得的宽/高就是0。

解决方案一般为：

1. `Activity/View#onWindowFocusChanged`：`onWindowFocusChanged`这个方法的含义是：View已经初始化完毕了，宽/高已经准备好了，这个时候去获取宽/高是没问题的。`onWindowFocusChanged`会被调用多次，当Activity的窗口得到焦点和失去焦点时均会被调用一次。
2. `view.post(runnable)`：通过post可以将一个runnable投递到消息队列的尾部，然后等待Looper调用此runnable的时候，View也已经初始化好了。
3. `ViewTreeObserver`：使用`ViewTreeObserver`的众多回调可以完成这个功能，比如使用`OnGlobalLayoutListener`这个接口，当View树的状态发生改变或者View树内部的View的可见性发现改变时，`onGlobalLayout`方法将被回调，因此这是获取View的宽/高一个很好的时机。需要注意的是，伴随着View树的状态改变等，`onGlobalLayout`会被调用多次。
4. `view.measure(int widthMeasureSpec,int heightMeasureSpec)`：通过手动对View进行measure来得到View的宽/高。这种方法比较复杂，这里要分情况处理。



### layout 过程

Layout的作用是ViewGroup用来确定子元素的位置，当ViewGroup的位置被确定后，它在onLayout中会遍历所有的子元素并调用其layout方法，在layout方法中onLayout方法又会被调用。

layout方法确定View本身的位置，而onLayout方法则会确定所有子元素的位置。

layout方法的大致流程如下：

1. 首先会通过setFrame方法来设定View的四个顶点的位置，即初始化mLeft、mRight、mTop和mBottom这四个值，View的四个顶点一旦确定，那么View在父容器中的位置也就确定了。
2. 接着会调用onLayout方法，这个方法的用途是父容器确定子元素的位置，和onMeasure方法类似，onLayout的具体实现同样和具体的布局有关，所以View和ViewGroup均没有真正实现onLayout方法。



### draw 过程

View的绘制过程遵循如下几步：

1. 绘制背景background.draw(canvas)

2. 绘制自己（onDraw）

3. 绘制children（dispatchDraw）

4. 绘制装饰（onDrawScrollBars）





## 自定义 View

一般有以下几种方式：

1. **继承View并重写`onDraw`方法：**这种方法主要用于实现一些不规则的效果，即这种效果不方便通过布局的组合方式来达到，往往需要静态或者动态地显示一些不规则的图形。很显然这需要通过绘制的方式来实现，即重写onDraw方法。采用这种方式需要自己支持wrap_content，并且padding也需要自己处理。
2. **继承ViewGroup派生处特殊的Layout：**这种方法主要用于实现自定义的布局，即除了LinearLayout、RelativeLayout、FrameLayout这几种系统的布局之外，我们重新定义一种新布局，当某种效果看起来很像几种View组合在一起的时候，可以采用这种方法来实现。采用这种方式稍微复杂一些，需要合适地处理ViewGroup的测量、布局这两个过程，并同时处理子元素的测量和布局过程。
3. **继承特定的View：**一般是用于扩展某种已有的View的功能，比如TextView，这种方法比较容易实现。这种方法不需要自己支持wrap_content和padding等。
4. **继承特定的ViewGroup：**当某种效果看起来很像几种View组合在一起的时候，可以采用这种方法来实现。采用这种方法不需要自己处理ViewGroup的测量和布局这两个过程。





## RemoveViews

RemoteViews在实际开发中，主要用在通知栏和桌面小部件的开发过程中。

通知栏主要是通过NotificationManager的notify方法来实现的，它除了默认效果外，还可以另外定义布局。

桌面小部件则是通过AppWidgetProvider来实现的，AppWidget-Provider本质上是一个广播。

通知栏和桌面小部件的开发过程中都会用到RemoteViews，它们在更新界面时无法像在Activity里面那样去直接更新View，这是因为二者的界面都运行在其他进程中，确切来说是系统的SystemServer进程。

为了跨进程更新界面，RemoteViews提供了一系列set方法，并且这些方法只是View全部方法的子集，另外RemoteViews中所支持的View类型也是有限的。



### PendingIntent

PendingIntent表示一种处于pending状态的意图，而pending状态表示的是一种待定、等待、即将发生的意思，就是说接下来有一个Intent（即意图）将在某个待定的时刻发生。

可以看出PendingIntent和Intent的区别在于，PendingIntent是在将来的某个不确定的时刻发生，而Intent是立刻发生。

PendingIntent典型的使用场景是给RemoteViews添加单击事件，因为RemoteViews运行在远程进程中，因此RemoteViews不同于普通的View，所以无法直接向View那样通过setOnClickListener方法来设置单击事件。

要想给RemoteViews设置单击事件，就必须使用PendingIntent，PendingIntent通过send和cancel方法来发送和取消特定的待定Intent。

PendingIntent支持三种待定意图：

1. 启动Activity
2. 启动Service
3. 发送广播

对应着它的三个接口方法：

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `getActivity(Context context, int requestCode, Intent intent, int flags)` | 获得一个PendingIntent，该待定意图发生时，效果相当于`Context.startActivity(Intent)` |
| `getService(Context context, int requestCode, Intent intent, int flags)` | 获得一个PendingIntent，该待定意图发生时，效果相当于`Context.startService(Intent)` |
| `getBroadcast(Context context, int requestCode, Intent intent, int flags)` | 获得一个PendingIntent，该待定意图发生时，效果相当于`Context.sendBroadcast(Intent)` |

requestCode表示PendingIntent发送方的请求码，多数情况下设为0即可，另外requestCode会影响到flags的效果。

flags常见的类型有：

1. `FLAG_ONE_SHOT`：当前描述的PendingIntent只能被使用一次，然后它就会被自动cancel，如果后续还有相同的PendingIntent，那么它们的send方法就会调用失败。对于通知栏消息来说，如果采用此标记位，那么同类的通知只能使用一次，后续的通知单击后将无法打开。
2. `FLAG_NO_CREATE`：当前描述的PendingIntent不会主动创建，如果当前PendingIntent之前不存在，那么getActivity、getService和getBroadcast方法会直接返回null，即获取PendingIntent失败。这个标记位很少见，它无法单独使用，因此在日常开发中它并没有太多的使用意义。
3. `FLAG_CANCEL_CURRENT`：当前描述的PendingIntent如果已经存在，那么它们都会被cancel，然后系统会创建一个新的PendingIntent。对于通知栏消息来说，那些被cancel的消息单击后将无法打开。
4. `FLAG_UPDATE_CURRENT`：当前描述的PendingIntent如果已经存在，那么它们都会被更新，即它们的Intent中的Extras会被替换成最新的。

:::info 匹配规则

PendingIntent的匹配规则为：如果两个PendingIntent它们内部的Intent相同并且requestCode也相同，那么这两个PendingIntent就是相同的。

Intent的匹配规则是：如果两个Intent的ComponentName和intent-filter都相同，那么这两个Intent就是相同的。

:::











