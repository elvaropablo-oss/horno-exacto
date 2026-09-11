const storageKey='he:v1:analytics-consent';
const banner=document.querySelector('[data-consent-banner]');
const read=()=>{try{return localStorage.getItem(storageKey)}catch{return null}};
const write=value=>{try{localStorage.setItem(storageKey,value)}catch{}};
const show=()=>{if(!banner)return;banner.hidden=false;banner.querySelector('[data-consent="granted"]')?.focus()};
const hide=()=>{if(banner)banner.hidden=true};
if(banner){
  if(!['granted','denied'].includes(read()))show();
  banner.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{
    const choice=button.dataset.consent;
    write(choice);
    if(choice==='denied'&&typeof window.gtag==='function')window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    hide();
  }));
}
const nav=document.querySelector('.site-footer nav');
if(nav&&!nav.querySelector('[data-consent-settings]')){
  const button=document.createElement('button');
  button.type='button';button.dataset.consentSettings='';button.className='consent-settings-link';button.textContent='Preferencias de analítica';button.addEventListener('click',show);nav.append(button);
}
const style=document.createElement('style');style.textContent='.consent-settings-link{padding:0;border:0;background:none;color:inherit;font:inherit;text-decoration:underline;cursor:pointer}.consent-settings-link:hover{opacity:.8}';document.head.appendChild(style);