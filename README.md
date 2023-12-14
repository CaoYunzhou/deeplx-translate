# deeplx-translate

![GitHub repo size](https://img.shields.io/github/repo-size/caoyunzhou/deeplx-translate)
[![GitHub Repo stars](https://img.shields.io/github/stars/caoyunzhou/deeplx-translate?style=social)](https://github.com/caoyunzhou/deeplx-translate/stargazers)

- 这个项目提供了一个简便的方式来翻译服务
- **@cf/meta/m2m100-1.2b**
- [参考文档](https://developers.cloudflare.com/workers-ai/models/translation/)

## 部署方式

- 感谢[cloudflare](https://cloudflare.com)
- 开通cloudflare的WorkAi功能
- 把index.js的内容粘贴到cloudflare的work中
- 在cloudflare > work > 触发器,配置自定义域名就可以愉快的翻译了

## 参考使用方式

```Shell
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","source_lang":"en","target_lang":"chinese"}' \
  https://deeplx.aivvm.com

```

### 响应

```Body
{
    "inputs": {
        "text": "Hello world",
        "source_lang": "english",
        "target_lang": "chinese"
    },
    "response": {
        "translated_text": "您好世界"
    }
}
```

## 参考deeplx使用方式

```Shell
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","source_lang":"en","target_lang":"chinese"}' \
  https://deeplx.aivvm.com/translate

```

### 响应

```Body
{
    "code": 200,
    "id": 1702554281366,
    "data": "您好世界",
    "alternatives": []
}
```


## 支持的翻译语种

- english
- chinese
- french
- spanish
- arabic
- russian
- german
- japanese
- portuguese
- hindi


### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=caoyunzhou/deeplx-translate&type=Date)](https://star-history.com/#caoyunzhou/deeplx-translate&Date)
