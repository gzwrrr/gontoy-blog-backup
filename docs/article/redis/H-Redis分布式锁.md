---
title: "Redis 分布式锁"
shortTitle: "H-Redis 分布式锁"
description: "Redis 分布式锁"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-22
category: 
- "redis"
- "数据库"
- "缓存"
tag:
- "redis"
- "数据库"
- "缓存"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Redis 分布式锁"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 2
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Redis 分布式锁"
  description: "Redis 分布式锁"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Redis 分布式锁


[[toc]]

:::info 什么是分布式锁

Redis分布式锁是一种基于Redis实现的分布式锁机制，它可以用来解决分布式系统中的并发访问问题。在分布式系统中，多个客户端同时操作共享资源时，如果没有进行合适的同步，就可能会出现数据不一致或者数据损坏的情况。分布式锁的作用就是保证同一时刻只有一个客户端能够操作共享资源，从而避免数据竞争和数据损坏的问题。

:::

## 如何实现

如何实现：

1. 利用 setnx 来保证：如果 key 不存在才能获取到锁，如果 key 存在就获取不到锁
2. 还要利用 lua 脚本来保证多个 redis 操作的原子性
3. 需要考虑锁过期的问题，需要额外的一个定时任务来监听是否锁是否需要续约
4. 同时还要考虑 redis 节点挂掉之后的情况，需要采用 **红锁** 的方式来同时向 $N/2 - 1$ 个节点申请锁，都申请到了才证明获取锁成功了，这样就算其中某个 redis 节点挂掉了，锁也不能被其他客户端获取

Redis分布式锁的实现原理是利用Redis的原子操作，将锁的状态存储在Redis中，并通过 Lua 脚本实现加锁和解锁的操作。Redis分布式锁的实现方式有多种，包括：

1. 单机锁
2. 基于 Redlock 算法的多节点锁
3. 基于Redission框架的分布式锁等。





## 注意点

在Redis分布式锁的实现中，需要注意以下几个问题：

1. 锁的存储方式：锁的状态可以通过字符串类型或者哈希类型存储在Redis中。如果使用字符串类型存储锁的状态，可以使用SETNX命令进行加锁操作，并通过DEL命令进行解锁操作。如果使用哈希类型存储锁的状态，则需要使用HSETNX命令进行加锁操作，并通过HDEL命令进行解锁操作。
2. 锁的过期时间：为了避免锁被永久占用，需要为锁设置过期时间。在Redis中，可以使用SET命令的EX选项或者SETEX命令来设置键的过期时间。
3. 加锁和解锁的原子性：加锁和解锁的操作必须是原子性的，否则就可能会出现多个客户端同时获取到锁的情况。为了保证操作的原子性，可以使用Lua脚本实现加锁和解锁的操作，通过EVAL命令来执行Lua脚本。
4. 锁的可重入性：如果一个客户端已经获取到锁，并且还想获取同一个锁，应该允许它重复获取锁。为了实现锁的可重入性，可以在锁的状态中记录客户端的标识符，并对每个客户端记录获取锁的次数。





## 获取与释放

获取锁的操作通常包括以下步骤：

1. 生成一个唯一的锁标识符（例如使用UUID或者时间戳等）。
2. 使用SETNX命令在Redis中设置一个键值对，键为锁标识符，值为任意值（例如"1"）。
3. 如果SETNX命令返回1，则表示获取锁成功，可以执行需要互斥访问的操作。否则，获取锁失败，需要等待一段时间后重试或者放弃。
4. 可以使用EXPIRE命令设置该键的过期时间，防止锁无限期占用。

释放锁的操作通常包括以下步骤：

1. 判断该锁是否为当前进程所持有，如果不是则不能释放。
2. 使用Redis事务（MULTI/EXEC命令）或者管道（PIPELINE命令）将删除锁的操作打包成一个原子性操作。





## 实战

### 环境准备

```shell
# nginx 配置中加上下面的配置
upstream sk {
    server localhost:8080;
    server localhost:8081;
    server localhost:8082;
}

server {
    listen 80;
    
    # 在主机的 host 配置文件中加上域名映射
    server_name sk.com;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://sk;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    	root html;
    }
}
```

依赖如下：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>


    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

配置文件如下：

```yaml
server:
  port: 8080

spring:
  redis:
    host: 192.168.30.201
    port: 6382
```



### 同步锁 synchronized

接口如下（总共启动三个服务）：

```java
@RestController
public class SeckillController {

    @Autowired
    private StringRedisTemplate srt;

    @Value("${server.port}")
    private String serverPort;

    /**
     * 加锁在分布式场景下无法解决超卖的问题
     */
    @GetMapping("/sk1")
    public String seckillHandler() {

        int res = 0;
        synchronized (this) {
            String stock = srt.opsForValue().get("sk:0008");
            int amount = stock == null ? 0 : Integer.parseInt(stock);
            if (amount > 0) {
                // 修改库存后再写回 redis
                srt.opsForValue().set("sk:0008", String.valueOf(--amount));
                res = amount;
            }
        }
        System.out.println("库存剩余: " + res);
        return "库存剩余: " + res;
    }
}
```

使用 Jmeter 进行测试，参数设置：商品数 1000，用户数 300，持续 4 轮，总计 1200 请求，因为是模拟高并发，所以每一轮持续时间设置为 0

![image-20230507174353598](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//redis/20230507/Jmeter%E6%B5%8B%E8%AF%95seckill(synchronized).png)

测试结果：1200 个请求结束后每个服务返回的剩余库存数为 500 左右，明显出现了较为严重的超卖问题

![image-20230507175104680](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//redis/20230507/seckill%E8%B6%85%E5%8D%96.png)



### 简单分布式锁

```java
@Autowired
private StringRedisTemplate srt;

private static final String REDIS_LOCK = "SECKILL_LOCK";

/**
 * 分布式锁
 */
@GetMapping("/sk2")
public String seckillHandler2() {
    String clientId = UUID.randomUUID().toString();

    try {
        // 添加锁
        // 一定要设置过期时间，如果不设置服务挂掉了会一直阻塞
        // 注意设置的时候要加锁和设置超时一起，这两个是一个原子操作，即不要分开设置
        // 但是如果业务处理时间过长，超过了设置的过期时间，也是有可能出现问题的
        Boolean lock = srt.opsForValue().setIfAbsent(REDIS_LOCK, clientId, 5, TimeUnit.SECONDS);

        if (lock) {
            String stock = srt.opsForValue().get("sk:0008");
            int amount = stock == null ? 0 : Integer.parseInt(stock);
            if (amount > 0) {
                // 修改库存后再写回 redis
                srt.opsForValue().set("sk:0008", String.valueOf(--amount));
                System.out.println("库存剩余: " + amount);
                return "库存剩余: " + amount;
            }
        }
    } finally {
        // 一定要删除，否则可能一直阻塞
        // 只有添加锁客户端才能释放锁
        // 但是要注意原子操作，否则可能会释放其他客户端的锁，所以下面的写法有问题
        if (srt.opsForValue().get(REDIS_LOCK).equals(clientId)) {
            srt.delete(REDIS_LOCK);
        }
    }

    System.out.println("没有抢到锁");
    return "没有抢到锁";
}
```



### 分布式锁 + Lua 脚本

```java
@Autowired
private StringRedisTemplate srt;

@Value("${spring.redis.host}")
private String redisHost;

@Value("${spring.redis.port}")
private Integer redisPort;

private static final String REDIS_LOCK = "SECKILL_LOCK";

/**
 * 分布式锁 + Lua 脚本
 */
@GetMapping("/sk3")
public String seckillHandler3() {
    String clientId = UUID.randomUUID().toString();
    try {
        // 添加锁
        // 一定要设置过期时间，如果不设置服务挂掉了会一直阻塞
        // 注意设置的时候要加锁和设置超时一起，这两个是一个原子操作，即不要分开设置
        // 但是如果业务处理时间过长，超过了设置的过期时间，也是有可能出现问题的
        Boolean lock = srt.opsForValue().setIfAbsent(REDIS_LOCK, clientId, 5, TimeUnit.SECONDS);

        if (lock) {
            String stock = srt.opsForValue().get("sk:0008");
            int amount = stock == null ? 0 : Integer.parseInt(stock);
            if (amount > 0) {
                // 修改库存后再写回 redis
                srt.opsForValue().set("sk:0008", String.valueOf(--amount));
                System.out.println("库存剩余: " + amount);
                return "库存剩余: " + amount;
            }
        }
    } finally {
        // Lua 脚本能够保证原子性
        // 但是注意，此时如果业务时间大于设置的过期时间还是可能出问题，可以使用可重入锁 + 锁续命解决，直接使用 Redisson 会方便很多
        JedisPool jedisPool = new JedisPool(redisHost, redisPort);
        try (Jedis jedis = jedisPool.getResource()) {
            String script = "if redis.call('get', KEYS[1]) == ARGV[1] " +
                "then return redis.call('del', KEYS[1]) " +
                "end " +
                "return 0 ";
            Object eval = jedis.eval(script, Collections.singletonList(REDIS_LOCK), Collections.singletonList(clientId));
            if ("1".equals(eval.toString())) {
                System.out.println("释放锁成功");
            } else {
                System.out.println("释放锁失败");
            }
        }
    }

    System.out.println("没有抢到锁");
    return "没有抢到锁";
}
```





### Redission 分布式锁

1. 使用 Redisson 的可重入锁可以轻松解决业务时间长于锁过期时间的问题
2. Redission 内部使用了 Lua 脚本实现了对可重入锁的添加、重入、续约、释放
3. Redission 需要用户指定一个 Key 加锁，但是无需指定锁的过期时间，因为设有默认的时间
4. Redission 实现了可重入功能，同时会为锁生成一个计数器，记录线程的重入次数

```javascript
@Autowired
private StringRedisTemplate srt;

private static final String REDIS_LOCK = "SECKILL_LOCK";

@Autowired
private Redisson redisson;

/**
 * Redission 分布式锁
 */
@GetMapping("/sk4")
public String seckillHandler4() {
    RLock lock = redisson.getLock(REDIS_LOCK);
    try {
        // 添加锁
        Boolean locked = lock.tryLock();
        if (locked) {
            String stock = srt.opsForValue().get("sk:0008");
            int amount = stock == null ? 0 : Integer.parseInt(stock);
            if (amount > 0) {
                // 修改库存后再写回 redis
                srt.opsForValue().set("sk:0008", String.valueOf(--amount));
                System.out.println("库存剩余: " + amount);
                return "库存剩余: " + amount;
            }
        }
    } finally {
        lock.unlock();
    }
    System.out.println("没有抢到锁");
    return "没有抢到锁";
}
```

Redission 中实现可重入锁的关键 Lua 脚本：

```lua
-- redis.call('exists', KEYS[1]) == 0 锁不存在就加
-- redis.call('hexists', KEYS[1], ARGV[2]) == 1 当加锁的不是当前客户端加的，就会直接返回 redis.call('pttl', KEYS[1]) 锁的过期时间
if ((redis.call('exists', KEYS[1]) == 0) or (redis.call('hexists', KEYS[1], ARGV[2]) == 1)) then 
    -- 计数 + 1
    redis.call('hincrby', KEYS[1], ARGV[2], 1)
    -- 设置过期时间
    redis.call('pexpire', KEYS[1], ARGV[1])
    return nil  
end
-- 返回过期时间
return redis.call('pttl', KEYS[1])
```

Redission 加锁源码，从上到下是跟着方法逐步追踪的关键代码：

```java
// 加锁
public RFuture<Boolean> tryLockAsync(long threadId) {
    return this.commandExecutor.getServiceManager().execute(() -> {
        return this.tryAcquireOnceAsync(-1L, -1L, (TimeUnit)null, threadId);
    });
}

// 加锁逻辑
private RFuture<Boolean> tryAcquireOnceAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId) {
    RFuture acquiredFuture;
   	// 加锁
    if (leaseTime > 0L) {
        acquiredFuture = this.tryLockInnerAsync(waitTime, leaseTime, unit, threadId, RedisCommands.EVAL_NULL_BOOLEAN);
    } else {
        acquiredFuture = this.tryLockInnerAsync(waitTime, 
                                                this.internalLockLeaseTime, 
                                                TimeUnit.MILLISECONDS, threadId, 
                                                RedisCommands.EVAL_NULL_BOOLEAN);
    }
    CompletionStage<Boolean> acquiredFuture = this.handleNoSync(threadId, acquiredFuture);
    // 续约
    CompletionStage<Boolean> f = acquiredFuture.thenApply((acquired) -> {
        // 如果申请锁成功
        if (acquired) {
            if (leaseTime > 0L) {
                // 还有时间就不续约
                this.internalLockLeaseTime = unit.toMillis(leaseTime);
            } else {
                // 续约定时任务
                this.scheduleExpirationRenewal(threadId);
            }
        }
        return acquired;
    });
    return new CompletableFutureWrapper(f);
}

// 使用 Lua 脚本加锁
<T> RFuture<T> tryLockInnerAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId, RedisStrictCommand<T> command) {
    return this.commandExecutor.syncedEval(this.getRawName(), 
                                           LongCodec.INSTANCE, 
                                           command, 
                                           "<上面的 Lua 脚本>", 
                                           Collections.singletonList(this.getRawName()), 
                                           new Object[]{unit.toMillis(leaseTime), this.getLockName(threadId)});
}

// 续约的定时任务
protected void scheduleExpirationRenewal(long threadId) {
    ExpirationEntry entry = new ExpirationEntry();
    ExpirationEntry oldEntry = (ExpirationEntry)EXPIRATION_RENEWAL_MAP.putIfAbsent(this.getEntryName(), entry);
    if (oldEntry != null) {
        oldEntry.addThreadId(threadId);
    } else {
        entry.addThreadId(threadId);
        try {
            // 续约
            this.renewExpiration();
        } finally {
            if (Thread.currentThread().isInterrupted()) {
                this.cancelExpirationRenewal(threadId);
            }
        }
    }
}

// 续约逻辑
private void renewExpiration() {
    ExpirationEntry ee = (ExpirationEntry)EXPIRATION_RENEWAL_MAP.get(this.getEntryName());
    if (ee != null) {
        // 这是一个延时任务，下面通过递归调用实现定时任务
        Timeout task = this.commandExecutor.getServiceManager().newTimeout(new TimerTask() {
            public void run(Timeout timeout) throws Exception {
                ExpirationEntry ent = (ExpirationEntry)RedissonBaseLock
                    .EXPIRATION_RENEWAL_MAP
                    .get(RedissonBaseLock.this.getEntryName());
                if (ent != null) {
                    Long threadId = ent.getFirstThreadId();
                    if (threadId != null) {
                        // 真正的 Lua 脚本续约操作
                        CompletionStage<Boolean> future = RedissonBaseLock.this.renewExpirationAsync(threadId);
                        // 续约完成后进行下面的操作
                        future.whenComplete((res, e) -> {
                            if (e != null) {
                                RedissonBaseLock.log.error("Can't update lock {} expiration", 
                                                           RedissonBaseLock.this.getRawName(), e);
                                RedissonBaseLock.EXPIRATION_RENEWAL_MAP.remove(RedissonBaseLock.this.getEntryName());
                            } else {
                                // 第一次续约成功后会递归调用自己，以此实现定时任务
                                if (res) {
                                    RedissonBaseLock.this.renewExpiration();
                                } else {
                                    // 到这里说明没有续约成功，直接取消
                                    RedissonBaseLock.this.cancelExpirationRenewal((Long)null);
                                }
                            }
                        });
                    }
                }
            }
            // 续约，每 1/3 默认时间续约一次，默认时间为 30 秒，所以这里是每 10 秒续约一次
        }, this.internalLockLeaseTime / 3L, TimeUnit.MILLISECONDS);
        ee.setTimeout(task);
    }
}

// 使用 Lua 脚本续约
protected CompletionStage<Boolean> renewExpirationAsync(long threadId) {
    return this.evalWriteAsync(this.getRawName(),
                               LongCodec.INSTANCE,
                               RedisCommands.EVAL_BOOLEAN,
                               "<下面续约的 Lua 脚本>", 
                               Collections.singletonList(this.getRawName()),
                               this.internalLockLeaseTime,
                               this.getLockName(threadId));
}
```

续约的 Lua 脚本

```lua
-- redis.call('hexists', KEYS[1], ARGV[2]) == 1 说明该客户端是原本加锁的，可以重入
if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then 
    -- 续约
    redis.call('pexpire', KEYS[1], ARGV[1]) 
    return 1
end
return 0
```

Redission 撤销锁的源码：

```java
// 撤销锁逻辑
private RFuture<Void> unlockAsync0(long threadId) {
    // 调用 Lua 脚本撤销锁
    CompletionStage<Boolean> future = this.unlockInnerAsync(threadId);
    CompletionStage<Void> f = future.handle((opStatus, e) -> {
        this.cancelExpirationRenewal(threadId);
        if (e != null) {
            if (e instanceof CompletionException) {
                throw (CompletionException)e;
            } else {
                throw new CompletionException(e);
            }
        } else if (opStatus == null) {
            IllegalMonitorStateException cause = new IllegalMonitorStateException(
                "attempt to unlock lock, not locked by current thread by node id: " + this.id + " thread-id: " + threadId);
            throw new CompletionException(cause);
        } else {
            return null;
        }
    });
    return new CompletableFutureWrapper(f);
}

// Lua 脚本撤销锁
protected RFuture<Boolean> unlockInnerAsync(long threadId) {
    return this.evalWriteAsync(this.getRawName(), 
                               LongCodec.INSTANCE,
                               RedisCommands.EVAL_BOOLEAN,
                               "<下面的 Lua 撤销锁脚本>",
                               Arrays.asList(this.getRawName(), this.getChannelName()),
                               new Object[]{LockPubSub.UNLOCK_MESSAGE,
                                            this.internalLockLeaseTime, 
                                            this.getLockName(threadId)});
}
```

撤销锁的 Lua 脚本：

```lua
-- redis.call('hexists', KEYS[1], ARGV[3]) == 0 只有上锁的进程才能解锁
if (redis.call('hexists', KEYS[1], ARGV[3]) == 0) then
    return nil
end
-- 获取计数
local counter = redis.call('hincrby', KEYS[1], ARGV[3], -1)
-- counter > 0 可重入次数大于 0 不能删除
if (counter > 0) then
    -- 续命
    redis.call('pexpire', KEYS[1], ARGV[2])
    return 0
else
    -- 删除锁
    redis.call('del', KEYS[1])
    -- 发布一条消息，撤销锁成功
    redis.call('publish', KEYS[2], ARGV[1])
    return 1 
end
return nil;
```

注意：还是可能存在问题，因为 Redis 集群是满足 AP 的，如果 Redis 集群中的 master 挂掉了，出现了锁丢失的问题，可能会有多个客户端能够对同一数据进行修改造成数据不一致。如果使用满足 CP 的 Zookeeper 就不会出现这个问题。当然，使用 Redission 的红锁也可以解决





### Redisson 红锁

1. Redission 红锁可以防止主从集群锁丢失问题
2. 红锁要求构建出至少三个 Redis 主从集群
3. 如果一个请求要申请加锁，必须向所有主从集群中提交 Key 写入请求，只有大多数集群写入成功后，锁才算申请成功

 ```java
@Bean("sentinel01")
public Redisson sentinel01() {
    Config config = new Config();
    config.useSentinelServers()
        .setMasterName("mymaster")
        .addSentinelAddress(
        String.format("redis://%s:%d", redisHost, 16380),
        String.format("redis://%s:%d", redisHost, 16381),
        String.format("redis://%s:%d", redisHost, 16382)
    )
        .setDatabase(0);
    return (Redisson) Redisson.create(config);
}

@Bean("sentinel02")
public Redisson sentinel02() {
    Config config = new Config();
    config.useSentinelServers()
        .setMasterName("mymaster")
        .addSentinelAddress(
        String.format("redis://%s:%d", redisHost, 26380),
        String.format("redis://%s:%d", redisHost, 26381),
        String.format("redis://%s:%d", redisHost, 26382)
    )
        .setDatabase(0);
    return (Redisson) Redisson.create(config);
}

@Bean("sentinel03")
public Redisson sentinel03() {
    Config config = new Config();
    config.useSentinelServers()
        .setMasterName("mymaster")
        .addSentinelAddress(
        String.format("redis://%s:%d", redisHost, 36380),
        String.format("redis://%s:%d", redisHost, 36381),
        String.format("redis://%s:%d", redisHost, 36382)
    )
        .setDatabase(0);
    return (Redisson) Redisson.create(config);
}
 ```

```java
@Resource(name = "sentinel01")
private Redisson sentinel01;

@Resource(name = "sentinel02")
private Redisson sentinel02;

@Resource(name = "sentinel03")
private Redisson sentinel03;

private static final String REDIS_LOCK = "SECKILL_LOCK";

/**
 * Redission 红锁
 */
@GetMapping("/sk5")
public String seckillHandler5() {
    // 可重入锁
    RLock rLock1 = sentinel01.getLock(REDIS_LOCK);
    RLock rLock2 = sentinel02.getLock(REDIS_LOCK);
    RLock rLock3 = sentinel03.getLock(REDIS_LOCK);
    // 红锁
    RLock lock = new RedissonRedLock(rLock1, rLock2, rLock3);
    try {
        // 添加锁
        Boolean locked = lock.tryLock();
        if (locked) {
            String stock = srt.opsForValue().get("sk:0008");
            int amount = stock == null ? 0 : Integer.parseInt(stock);
            if (amount > 0) {
                // 修改库存后再写回 redis
                srt.opsForValue().set("sk:0008", String.valueOf(--amount));
                System.out.println("库存剩余: " + amount);
                return "库存剩余: " + amount;
            }
        }
    } finally {
        lock.unlock();
    }
    System.out.println("没有抢到锁");
    return "没有抢到锁";
}
```





### Redssion 分段锁

解决锁的串行化引发的性能问题的解决方案是，将访问并行化

将要共享的一个资源，拆分为多个共享访问资源，这样就会将一把锁的需求转变为多把锁，实现并行化

> TODO



