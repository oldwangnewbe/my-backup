import requests
import json
from typing import List, Dict, Any
from pathlib import Path

# 定义规则源URL列表
RULE_SOURCES = [
    "https://raw.githubusercontent.com/ziduhuihai/Yakit-Rules/refs/heads/main/yakit-mitm-replacer-rules-config.json",
    "https://raw.githubusercontent.com/SexyBeast233/rule4yak/refs/heads/main/yakit-mitm-replacer-rules-config.json",
    "https://raw.githubusercontent.com/ev1lfy/yakit-rules/refs/heads/main/yakit-rules"
]

# 输出文件名
OUTPUT_FILENAME = "yakit-mitm-replacer-rules-config.json"

# 配置代理
PROXY_CONFIG = {
    "http": "127.0.0.1:7890",
    "https": "127.0.0.1:7890"
}


def fetch_rules(url: str) -> List[Dict[str, Any]]:
    """从指定URL获取规则配置"""
    try:
        response = requests.get(
            url,
            proxies=PROXY_CONFIG,
            verify=False,
            timeout=10
        )
        response.raise_for_status()  # 检查HTTP错误
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching rules from {url}: {e}")
        return []  # 出错时返回空列表


def merge_and_deduplicate_rules(rule_sources: List[str]) -> List[Dict[str, Any]]:
    """合并并去重多个规则源"""
    seen_rules = set()
    unique_rules = []

    for source in rule_sources:
        rules = fetch_rules(source)
        for rule in rules:
            rule_content = rule.get("Rule")
            if rule_content and rule_content not in seen_rules:
                seen_rules.add(rule_content)
                unique_rules.append(rule)

    return unique_rules


def save_rules_to_file(rules: List[Dict[str, Any]], filename: str):
    """将规则保存到JSON文件"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(rules, f, indent=2, ensure_ascii=False)
        print(f"规则已成功保存到 {Path(filename).absolute()}")
    except IOError as e:
        print(f"保存文件时出错: {e}")


if __name__ == '__main__':
    # 获取并处理规则
    merged_rules = merge_and_deduplicate_rules(RULE_SOURCES)

    # 输出结果统计信息
    print(f"获取到的唯一规则数量: {len(merged_rules)}")

    # 保存到文件
    save_rules_to_file(merged_rules, OUTPUT_FILENAME)