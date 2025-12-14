            // 4. TaskFormer (Strategy / Operations)
            // Concept: "Swarm Alignment". Particles (tasks/agents) start in a chaotic swarm.
            // On interaction, they align into a structured geometric formation (The Plan).
            const canvas4 = document.getElementById('canvas-taskformer');
            if (canvas4) {
                const ctx = canvas4.getContext('2d');
                let width, height;
                let particles = [];
                let isHovered = false;
                let isVisible = false;
                let animationId = null;
                
                const parent = canvas4.parentElement;
                parent.addEventListener('mouseenter', () => isHovered = true);
                parent.addEventListener('mouseleave', () => isHovered = false);
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        isVisible = entry.isIntersecting;
                        if (isVisible && !animationId) animate();
                    });
                }, { threshold: 0.1 });
                observer.observe(canvas4);
                
                const resize = () => {
                    width = canvas4.width = canvas4.parentElement.offsetWidth;
                    height = canvas4.height = canvas4.parentElement.offsetHeight;
                    
                    particles = [];
                    const count = 60;
                    for(let i=0; i<count; i++) {
                        particles.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            vx: (Math.random() - 0.5) * 2,
                            vy: (Math.random() - 0.5) * 2,
                            size: Math.random() * 2 + 1,
                            // Target position (Circle formation)
                            tx: width/2 + Math.cos(i/count * Math.PI * 2) * (height * 0.3),
                            ty: height/2 + Math.sin(i/count * Math.PI * 2) * (height * 0.3)
                        });
                    }
                };
                resize();
                window.addEventListener('resize', debounce(resize, 150));

                const animate = () => {
                    ctx.fillStyle = '#0A0A0A';
                    ctx.fillRect(0, 0, width, height);
                    
                    // Physics Loop
                    particles.forEach((p, i) => {
                        // 1. Chaos Force (Brownian Motion)
                        if (!isHovered) {
                            p.x += p.vx;
                            p.y += p.vy;
                            
                            // Bounce
                            if(p.x < 0 || p.x > width) p.vx *= -1;
                            if(p.y < 0 || p.y > height) p.vy *= -1;
                        }
                        
                        // 2. Order Force (Spring to Target)
                        if (isHovered) {
                            // Lerp to target
                            p.x += (p.tx - p.x) * 0.1;
                            p.y += (p.ty - p.y) * 0.1;
                        }
                        
                        // Draw Particle
                        ctx.fillStyle = isHovered ? '#fff' : '#666';
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                        ctx.fill();
                        
                        // Draw Connections (Nearest Neighbors)
                        // Only connect if close enough
                        particles.forEach((other, j) => {
                            if (i >= j) return;
                            const dx = p.x - other.x;
                            const dy = p.y - other.y;
                            const dist = Math.sqrt(dx*dx + dy*dy);
                            
                            if (dist < 60) {
                                ctx.strokeStyle = isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(100, 100, 100, 0.1)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(other.x, other.y);
                                ctx.stroke();
                            }
                        });
                    });
                    
                    // Draw "The Plan" (Target Geometry Ghost)
                    if (isHovered) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc(width/2, height/2, height * 0.3, 0, Math.PI*2);
                        ctx.stroke();
                    }

                    if (isVisible) animationId = requestAnimationFrame(animate);
                    else animationId = null;
                };
            }