# Manager#sealKey
引数で渡されたキーに対する要素を封鎖します。封鎖すると要素の削除ができなくなります。  
封鎖を解除するときは[Manager#unsealKey](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/unsealKey.md)や[Manager#unsealKeys](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/unsealKeys.md)を使います。  
封鎖の詳しい仕様については[topics-seal](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/topics/seal.md)をご覧ください。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
key|*K*|封鎖するキー|none  
  
**Return**: Manager\<*K*, *V*\>(=*this*)  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)