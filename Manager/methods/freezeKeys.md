# Manager#freezeKeys
引数で渡されたキー(達)を凍結します。  
凍結を解除するときは[Manager#unfreezeKey](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/unfreezeKey.md)や[Manager#unfreezeKeys](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/unfreezeKeys.md)を使います。  
凍結については[topics-freeze](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/topics/freeze.md)をご覧ください。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
keys|[Spread](https://github.com/Mametaro-discord/DataManager)\<*K*\>|凍結するキー(達)|none  
  
**Return**: Manager\<*K*, *V*\>  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)