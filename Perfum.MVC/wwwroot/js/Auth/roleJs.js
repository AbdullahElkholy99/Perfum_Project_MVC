
//let currentRoleId = null;
//let roles = [];

//document.addEventListener('DOMContentLoaded', function () {
//    initializeRoleManagement();
//    loadRoles();
//});

//// Initialize
//function initializeRoleManagement() {
//    setupSearch();
//    setupFilters();
//    setupViewToggle();
//    setupTabSwitching();
//}

//// Load Roles Data
//function loadRoles() {
//    // In production, fetch from API
//    roles = [
//        { id: 1, name: 'Super Admin', nameAr: 'مدير أعلى', users: 3, permissions: 45, category: 'admin', status: 'active' },
//        { id: 2, name: 'Admin', nameAr: 'إداري', users: 8, permissions: 38, category: 'admin', status: 'active' },
//        { id: 3, name: 'Manager', nameAr: 'مدير', users: 12, permissions: 28, category: 'admin', status: 'active' },
//        { id: 4, name: 'Receptionist', nameAr: 'موظف استقبال', users: 18, permissions: 15, category: 'staff', status: 'active' },
//        { id: 5, name: 'Head Trainer', nameAr: 'مدرب رئيسي', users: 5, permissions: 22, category: 'trainer', status: 'active' },
//        { id: 6, name: 'Trainer', nameAr: 'مدرب', users: 45, permissions: 18, category: 'trainer', status: 'active' },
//        { id: 7, name: 'Nutritionist', nameAr: 'أخصائي تغذية', users: 8, permissions: 12, category: 'staff', status: 'active' },
//        { id: 8, name: 'Member', nameAr: 'عضو', users: 1254, permissions: 8, category: 'member', status: 'active' }
//    ];

//    //console.log('Roles loaded:', roles.length);
//}

//// Setup Search
//function setupSearch() {
//    const searchInput = document.getElementById('searchRoles');
//    if (searchInput) {
//        searchInput.addEventListener('input', debounce(function (e) {
//            const searchTerm = e.target.value.toLowerCase();
//            filterRoles(searchTerm);
//        }, 300));
//    }
//}

//// Filter Roles
//function filterRoles(searchTerm) {
//    const roleCards = document.querySelectorAll('.role-card');
//    let visibleCount = 0;

//    roleCards.forEach(card => {
//        const roleName = card.querySelector('h3').textContent.toLowerCase();
//        const roleDescription = card.querySelector('.role-description').textContent.toLowerCase();

//        if (roleName.includes(searchTerm) || roleDescription.includes(searchTerm)) {
//            card.style.display = 'block';
//            visibleCount++;
//        } else {
//            card.style.display = 'none';
//        }
//    });

//    //console.log('Filtered roles:', visibleCount);
//}

//// Setup Filters
//function setupFilters() {
//    const statusFilter = document.getElementById('filterStatus');
//    const categoryFilter = document.getElementById('filterCategory');

//    if (statusFilter) {
//        statusFilter.addEventListener('change', applyFilters);
//    }

//    if (categoryFilter) {
//        categoryFilter.addEventListener('change', applyFilters);
//    }
//}

//// Apply Filters
//function applyFilters() {
//    const status = document.getElementById('filterStatus').value;
//    const category = document.getElementById('filterCategory').value;
//    const roleCards = document.querySelectorAll('.role-card');

//    roleCards.forEach(card => {
//        let showCard = true;

//        // Category filter
//        if (category !== 'all') {
//            const roleCategory = card.className.split(' ').find(c => c !== 'role-card');
//            if (roleCategory !== category) {
//                showCard = false;
//            }
//        }

//        // Status filter (all are active in this demo)
//        if (status !== 'all') {
//            // In production, check actual status
//        }

//        card.style.display = showCard ? 'block' : 'none';
//    });
//}

//// Setup View Toggle
//function setupViewToggle() {
//    document.querySelectorAll('.view-btn').forEach(btn => {
//        btn.addEventListener('click', function () {
//            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
//            this.classList.add('active');

//            const view = this.getAttribute('data-view');
//            const grid = document.getElementById('rolesGrid');

//            if (view === 'list') {
//                grid.style.gridTemplateColumns = '1fr';
//            } else {
//                grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
//            }
//        });
//    });
//}

//// Setup Tab Switching
//function setupTabSwitching() {
//    document.querySelectorAll('.permissions-tabs .tab-btn').forEach(btn => {
//        btn.addEventListener('click', function (e) {
//            e.preventDefault();

//            document.querySelectorAll('.permissions-tabs .tab-btn').forEach(b => {
//                b.classList.remove('active');
//            });
//            this.classList.add('active');

//            const tab = this.getAttribute('data-tab');
//            //console.log('Switched to tab:', tab);

//            // In production, show/hide relevant permissions
//        });
//    });
//}

//// Open Add Role Modal
//function openAddRoleModal() {
//    currentRoleId = null;
//    document.getElementById('modalTitle').textContent = 'إضافة دور جديد';
//    document.getElementById('roleForm').reset();
//    document.getElementById('roleModal').classList.add('active');

//    // Reset permissions checkboxes
//    document.querySelectorAll('#roleForm input[type="checkbox"]').forEach(cb => {
//        cb.checked = false;
//    });
//}

////// Edit Role
////function editRole(roleId) {
////    currentRoleId = roleId;
////    let role = roles.find(r => r.id === roleId);

////    if (!role) {
////        showNotification('الدور غير موجود', 'error');
////        return;
////    }

////    document.getElementById('modalTitle').textContent = 'تعديل الدور';
////    document.getElementById('roleName').value = role.name;
////    document.getElementById('roleNameAr').value = role.nameAr;
////    document.getElementById('roleCategory').value = role.category;
////    document.getElementById('roleStatus').value = role.status;

////    // Load permissions
////    // In production, fetch and set actual permissions

////    document.getElementById('roleModal').classList.add('active');

////    showNotification(`جاري تحميل بيانات: ${role.nameAr}`, 'info');
////}

//// View Role Details
//function viewRoleDetails(roleId) {
//    let role = roles.find(r => r.id === roleId);

//    if (!role) {
//        showNotification('الدور غير موجود', 'error');
//        return;
//    }

//    const detailsContent = `
//        <div class="role-details">
//            <div class="detail-section">
//                <h3>معلومات أساسية</h3>
//                <div class="detail-row">
//                    <span class="detail-label">اسم الدور:</span>
//                    <strong>${role.name}</strong>
//                </div>
//                <div class="detail-row">
//                    <span class="detail-label">الاسم بالعربية:</span>
//                    <strong>${role.nameAr}</strong>
//                </div>
//                <div class="detail-row">
//                    <span class="detail-label">الفئة:</span>
//                    <strong>${role.category}</strong>
//                </div>
//                <div class="detail-row">
//                    <span class="detail-label">الحالة:</span>
//                    <span class="status-badge ${role.status}">${role.status === 'active' ? 'نشط' : 'غير نشط'}</span>
//                </div>
//            </div>
            
//            <div class="detail-section">
//                <h3>الإحصائيات</h3>
//                <div class="detail-row">
//                    <span class="detail-label">عدد المستخدمين:</span>
//                    <strong>${role.users}</strong>
//                </div>
//                <div class="detail-row">
//                    <span class="detail-label">الصلاحيات:</span>
//                    <strong>${role.permissions}/45</strong>
//                </div>
//            </div>
            
//            <div class="detail-section">
//                <h3>الصلاحيات المفعلة</h3>
//                <div class="permissions-list">
//                    <span class="permission-badge">عرض المستخدمين</span>
//                    <span class="permission-badge">إضافة مستخدمين</span>
//                    <span class="permission-badge">تعديل مستخدمين</span>
//                    <span class="permission-badge">عرض التمارين</span>
//                    <span class="permission-badge">إضافة تمارين</span>
//                    <!-- Add more permissions -->
//                </div>
//            </div>
//        </div>
//    `;

//    document.getElementById('roleDetailsContent').innerHTML = detailsContent;
//    document.getElementById('roleDetailsModal').classList.add('active');
//}

////// Delete Role
////function deleteRole(roleId) {
////    currentRoleId = roleId;
////    const role = roles.find(r => r.id === roleId);

////    if (!role) {
////        showNotification('الدور غير موجود', 'error');
////        return;
////    }

////    if (role.id === 1 || role.id === 8) {
////        showNotification('لا يمكن حذف هذا الدور', 'error');
////        return;
////    }

////    document.getElementById('deleteModal').classList.add('active');
////}

////// Confirm Delete
////function confirmDelete() {
////    if (!currentRoleId) return;

////    const role = roles.find(r => r.id === currentRoleId);

////    showNotification('جاري حذف الدور...', 'info');

////    // In production, send DELETE request to API
////    setTimeout(() => {
////        const roleCard = document.querySelector(`[data-role-id="${currentRoleId}"]`);
////        if (roleCard) {
////            roleCard.style.animation = 'fadeOut 0.3s ease';
////            setTimeout(() => {
////                roleCard.remove();
////                showNotification(`تم حذف دور "${role.nameAr}" بنجاح`, 'success');

////                // Remove from array
////                roles = roles.filter(r => r.id !== currentRoleId);

////                closeDeleteModal();
////            }, 300);
////        }
////    }, 1000);
////}

//// Save Role
//function saveRole() {
//    const roleName = document.getElementById('roleName').value;
//    const roleNameAr = document.getElementById('roleNameAr').value;
//    const roleDescription = document.getElementById('roleDescription').value;
//    const roleCategory = document.getElementById('roleCategory').value;
//    const roleStatus = document.getElementById('roleStatus').value;

//    // Get selected permissions
//    const permissions = [];
//    document.querySelectorAll('#roleForm input[type="checkbox"]:checked').forEach(cb => {
//        permissions.push(cb.value);
//    });

//    // Validation
//    if (!roleName || !roleNameAr) {
//        showNotification('الرجاء إدخال جميع الحقول المطلوبة', 'error');
//        return;
//    }

//    const roleData = {
//        name: roleName,
//        nameAr: roleNameAr,
//        description: roleDescription,
//        category: roleCategory,
//        status: roleStatus,
//        permissions: permissions
//    };

//    if (currentRoleId) {
//        // Update existing role
//        showNotification('جاري تحديث الدور...', 'info');

//        setTimeout(() => {
//            // In production, send PUT request to API
//            const roleIndex = roles.findIndex(r => r.id === currentRoleId);
//            if (roleIndex !== -1) {
//                roles[roleIndex] = { ...roles[roleIndex], ...roleData };
//            }

//            showNotification('تم تحديث الدور بنجاح', 'success');
//            closeRoleModal();

//            // Refresh the role card
//            // In production, reload or update the specific card
//        }, 1000);
//    } else {
//        // Create new role
//        showNotification('جاري إنشاء الدور...', 'info');

//        setTimeout(() => {
//            // In production, send POST request to API
//            const newRole = {
//                id: roles.length + 1,
//                ...roleData,
//                users: 0,
//                permissions: permissions.length
//            };
//            roles.push(newRole);

//            showNotification('تم إنشاء الدور بنجاح', 'success');
//            closeRoleModal();

//            // Add new card to grid
//            // In production, reload or append new card
//        }, 1000);
//    }
//}

//// Close Modals
//function closeRoleModal() {
//    document.getElementById('roleModal').classList.remove('active');
//    currentRoleId = null;
//}
//    document.addEventListener("click", function (e) {
//        if (e.target.closest(".modal-close")) {
//            const modal = document.getElementById("roleModal");
//            if (modal) {
//                modal.classList.remove("show");
//            }
//        }
//    });
//function closeDetailsModal() {
//    document.getElementById('roleDetailsModal').classList.remove('active');
//}



//// Export Permissions Matrix
//function exportPermissionsMatrix() {
//    showNotification('جاري تصدير مصفوفة الصلاحيات...', 'info');

//    setTimeout(() => {
//        showNotification('تم تصدير المصفوفة بنجاح بصيغة Excel', 'success');
//        //console.log('Exporting permissions matrix...');
//        // In production, generate and download Excel file
//    }, 1500);
//}

//// Show Notification
//function showNotification(message, type = 'info') {
//    const notification = document.createElement('div');
//    notification.className = `notification notification-${type}`;
//    notification.innerHTML = `
//        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
//        <span>${message}</span>
//    `;

//    if (!document.getElementById('notification-styles')) {
//        const styles = document.createElement('style');
//        styles.id = 'notification-styles';
//        styles.textContent = `
//            .notification {
//                position: fixed;
//                top: 100px;
//                left: 50%;
//                transform: translateX(-50%);
//                background: white;
//                padding: 1rem 1.5rem;
//                border-radius: 10px;
//                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//                display: flex;
//                align-items: center;
//                gap: 0.75rem;
//                z-index: 10000;
//                animation: slideDown 0.3s ease;
//                min-width: 300px;
//            }
            
//            .notification-info {
//                border-left: 4px solid #667eea;
//            }
            
//            .notification-success {
//                border-left: 4px solid #10b981;
//            }
            
//            .notification-error {
//                border-left: 4px solid #ef4444;
//            }
            
//            .notification i {
//                font-size: 1.2rem;
//            }
            
//            .notification-info i {
//                color: #667eea;
//            }
            
//            .notification-success i {
//                color: #10b981;
//            }
            
//            .notification-error i {
//                color: #ef4444;
//            }
            
//            @keyframes slideDown {
//                from {
//                    opacity: 0;
//                    transform: translateX(-50%) translateY(-20px);
//                }
//                to {
//                    opacity: 1;
//                    transform: translateX(-50%) translateY(0);
//                }
//            }
            
//            @keyframes fadeOut {
//                from {
//                    opacity: 1;
//                    transform: scale(1);
//                }
//                to {
//                    opacity: 0;
//                    transform: scale(0.9);
//                }
//            }
            
//            .role-details {
//                display: flex;
//                flex-direction: column;
//                gap: 1.5rem;
//            }
            
//            .detail-section {
//                padding: 1rem;
//                background: var(--bg-light);
//                border-radius: 10px;
//            }
            
//            .detail-section h3 {
//                margin-bottom: 1rem;
//                color: var(--text-primary);
//                font-size: 1.1rem;
//            }
            
//            .detail-row {
//                display: flex;
//                justify-content: space-between;
//                padding: 0.75rem 0;
//                border-bottom: 1px solid var(--border-color);
//            }
            
//            .detail-row:last-child {
//                border-bottom: none;
//            }
            
//            .detail-label {
//                color: var(--text-secondary);
//            }
            
//            .permissions-list {
//                display: flex;
//                flex-wrap: wrap;
//                gap: 0.5rem;
//            }
            
//            .permission-badge {
//                display: inline-block;
//                padding: 0.5rem 1rem;
//                background: white;
//                border-radius: 20px;
//                font-size: 0.85rem;
//                color: var(--primary-color);
//                border: 2px solid var(--primary-color);
//            }
            
//            .status-badge.active {
//                background: rgba(16, 185, 129, 0.1);
//                color: #10b981;
//                padding: 0.25rem 0.75rem;
//                border-radius: 20px;
//                font-weight: 600;
//            }
//        `;
//        document.head.appendChild(styles);
//    }

//    document.body.appendChild(notification);

//    setTimeout(() => {
//        notification.style.animation = 'slideDown 0.3s ease reverse';
//        setTimeout(() => notification.remove(), 300);
//    }, 3000);
//}

//// Debounce Function
//function debounce(func, wait) {
//    let timeout;
//    return function executedFunction(...args) {
//        const later = () => {
//            clearTimeout(timeout);
//            func(...args);
//        };
//        clearTimeout(timeout);
//        timeout = setTimeout(later, wait);
//    };
//}

//// Keyboard Shortcuts
//document.addEventListener('keydown', function (e) {
//    // Ctrl/Cmd + N to add new role
//    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
//        e.preventDefault();
//        openAddRoleModal();
//    }

//    // ESC to close modals
//    if (e.key === 'Escape') {
//        closeRoleModal();
//        closeDetailsModal();
//        closeDeleteModal();
//    }
//});

//// Close modals when clicking outside
//document.querySelectorAll('.modal-overlay').forEach(overlay => {
//    overlay.addEventListener('click', function () {
//        const modal = this.closest('.modal');
//        modal.classList.remove('active');
//    });
//});

//// Animate role cards on load
////const observer = new IntersectionObserver((entries) => {
////    entries.forEach(entry => {
////        if (entry.isIntersecting) {
////            entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
////        }
////    });
////}, { threshold: 0.1 });

////document.querySelectorAll('.role-card').forEach(card => {
////    observer.observe(card);
////});


////document.addEventListener("DOMContentLoaded", function () {

////    const observer = new IntersectionObserver((entries) => {
////        entries.forEach(entry => {
////            if (entry.isIntersecting) {
////                entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
////            }
////        });
////    }, { threshold: 0.1 });

////    document.querySelectorAll('.role-card').forEach(card => {
////        observer.observe(card);
////    });

////});


//// Add fadeInUp animation
//const style = document.createElement('style');
//style.textContent = `
//    @keyframes fadeInUp {
//        from {
//            opacity: 0;
//            transform: translateY(20px);
//        }
//        to {
//            opacity: 1;
//            transform: translateY(0);
//        }
//    }
    
//    .role-card {
//        opacity: 0;
//    }
//`;
//document.head.appendChild(style);

//// Track activity
////console.log('Role Management page loaded');
////console.log('Total roles:', roles.length);

//// Auto-save form data (draft)
//let formAutosaveTimer;
//document.querySelectorAll('#roleForm input, #roleForm select, #roleForm textarea').forEach(input => {
//    input.addEventListener('input', function () {
//        clearTimeout(formAutosaveTimer);
//        formAutosaveTimer = setTimeout(() => {
//            //console.log('Auto-saving form data...');
//            // Save to localStorage as draft
//        }, 2000);
//    });
//});

////console.log('Role Management initialized successfully');














//----------------------------- my code

// Add Role ------------------------------------------------- Success
document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("add-role-btn");

    if (btn) {
        btn.addEventListener("click", function () {
            addRole();
        });
    }

});

function addRole() {
    //console.log("clicked");

    fetch(`/Role/Add`)
        .then(response => response.text())
        .then(html => {

            const container = document.getElementById("modal-container");

            if (!container) {
                console.error("modal-container not found!");
                return;
            }

            container.innerHTML = html;

            const modal = container.querySelector("#roleModal");

            if (!modal) {
                console.error("Role-modal not found inside partial!");
                return;
            }

            modal.classList.add("show");
        })
        .catch(error => console.error(error));
}




//// Edit Role     -------------------------- Done
function editRole(id) {
    console.log("Edit")
    
    fetch(`/Role/Edit/${id}`)
        .then(response => response.text())
        .then(html => {

            const container = document.getElementById("modal-container");

            if (!container) {
                console.error("modal-container not found!");
                return;
            }

            container.innerHTML = html;

            const modal = container.querySelector("#roleModal");

            if (!modal) {
                console.error("Role-modal not found inside partial!");
                return;
            }

            modal.classList.add("show");
        })
        .catch(error => console.error(error));
}
function closeRoleModal() {
    const container = document.getElementById("modal-container");

    if (!container) return;

    const modal = container.querySelector("#roleModal");

    if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
    }
}

// deleteRole ------------------------------------------- Success

let deleteId = null;
function deleteRole(id) {
    console.log("gsad")
    fetch(`/Role/Delete/${id}`)
        .then(res => res.text())
        .then(html => {

            document.getElementById("modal-container").innerHTML = html;
            document.getElementById("delete-modal").style.display = "block";
        });
}
function confirmDelete(id) {

    fetch(`/Role/DeleteConfirmed/${id}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(result => {

            if (result.success) {

                document.getElementById("modal-container").innerHTML = "";
                showNotification('تم حذف العضو بنجاح', 'success');
            }
            else {
                showNotification('فشل في الحذف', 'error');
            }
        });
}
function closeDeleteModal() {
    document.getElementById("delete-modal").style.display = "none";
    currentRoleId = null;
}


console.log("Hello Abdo")

